import React, { useRef, useEffect, useCallback, useState } from 'react';
import * as THREE from 'three';
import { useTheme } from '../../contexts/ThemeContext';

interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured?: boolean;
}

interface WebGL3DGalleryProps {
  projects: Project[];
  onProjectSelect?: (project: Project) => void;
  autoRotate?: boolean;
  cameraControls?: boolean;
}

export const WebGL3DGallery: React.FC<WebGL3DGalleryProps> = ({
  projects,
  onProjectSelect,
  autoRotate = true,
  cameraControls = true
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene>();
  const rendererRef = useRef<THREE.WebGLRenderer>();
  const cameraRef = useRef<THREE.PerspectiveCamera>();
  const animationRef = useRef<number>();
  const projectMeshesRef = useRef<THREE.Mesh[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const timeRef = useRef(0);
  const raycasterRef = useRef<THREE.Raycaster>();
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);
  const [selectedProject, setSelectedProject] = useState<string | null>(null);

  const { theme } = useTheme();

  // Performance settings
  const getPerformanceSettings = useCallback(() => {
    const isMobile = window.innerWidth < 768;
    const isLowEnd = navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4;

    return {
      maxProjects: isMobile ? 8 : isLowEnd ? 12 : 16,
      textureSize: isMobile ? 256 : 512,
      enableShadows: !isMobile && !isLowEnd,
      enablePostProcessing: !isMobile && !isLowEnd,
      pixelRatio: Math.min(window.devicePixelRatio, isMobile ? 1 : 2)
    };
  }, []);

  // Create project texture from image
  const createProjectTexture = useCallback((project: Project) => {
    const canvas = document.createElement('canvas');
    const settings = getPerformanceSettings();
    canvas.width = settings.textureSize;
    canvas.height = settings.textureSize;
    const ctx = canvas.getContext('2d')!;

    // Background gradient
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    if (theme === 'matrix') {
      gradient.addColorStop(0, '#002200');
      gradient.addColorStop(1, '#000000');
    } else {
      gradient.addColorStop(0, '#1a1a1a');
      gradient.addColorStop(1, '#000000');
    }
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Project frame
    ctx.strokeStyle = theme === 'matrix' ? '#00ff00' : '#ffffff';
    ctx.lineWidth = 4;
    ctx.strokeRect(20, 20, canvas.width - 40, canvas.height - 40);

    // Title
    ctx.fillStyle = theme === 'matrix' ? '#00ff00' : '#ffffff';
    ctx.font = 'bold 24px "Courier New", monospace';
    ctx.textAlign = 'center';
    ctx.fillText(project.title, canvas.width / 2, 60);

    // Description
    ctx.font = '16px "Courier New", monospace';
    const words = project.description.split(' ');
    let line = '';
    let y = 100;
    const maxWidth = canvas.width - 60;

    for (let i = 0; i < words.length; i++) {
      const testLine = line + words[i] + ' ';
      const metrics = ctx.measureText(testLine);
      if (metrics.width > maxWidth && i > 0) {
        ctx.fillText(line, canvas.width / 2, y);
        line = words[i] + ' ';
        y += 24;
        if (y > canvas.height - 100) break; // Don't overflow
      } else {
        line = testLine;
      }
    }
    ctx.fillText(line, canvas.width / 2, y);

    // Tags
    if (project.tags.length > 0) {
      ctx.font = '14px "Courier New", monospace';
      ctx.fillStyle = theme === 'matrix' ? '#00cc00' : '#cccccc';
      const tagsText = project.tags.slice(0, 3).join(' | ');
      ctx.fillText(tagsText, canvas.width / 2, canvas.height - 40);
    }

    // Matrix-style border animation
    if (theme === 'matrix') {
      ctx.strokeStyle = '#00ff00';
      ctx.lineWidth = 2;
      ctx.setLineDash([5, 5]);
      ctx.strokeRect(10, 10, canvas.width - 20, canvas.height - 20);
    }

    return new THREE.CanvasTexture(canvas);
  }, [theme, getPerformanceSettings]);

  // Initialize Three.js scene
  const initializeScene = useCallback(() => {
    if (!mountRef.current) return;

    const settings = getPerformanceSettings();

    // Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);
    sceneRef.current = scene;

    // Camera
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 10);
    cameraRef.current = camera;

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: !settings.enableShadows,
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(settings.pixelRatio);
    renderer.shadowMap.enabled = settings.enableShadows;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    rendererRef.current = renderer;

    // Raycaster for interaction
    raycasterRef.current = new THREE.Raycaster();

    mountRef.current.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(
      theme === 'matrix' ? 0x003300 : 0x404040,
      0.3
    );
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(
      theme === 'matrix' ? 0x00ff00 : 0xffffff,
      0.8
    );
    directionalLight.position.set(5, 5, 5);
    if (settings.enableShadows) {
      directionalLight.castShadow = true;
      directionalLight.shadow.mapSize.width = 1024;
      directionalLight.shadow.mapSize.height = 1024;
    }
    scene.add(directionalLight);

    createProjectGallery();
  }, [theme, getPerformanceSettings]);

  // Create 3D project gallery layout
  const createProjectGallery = useCallback(() => {
    if (!sceneRef.current) return;

    const settings = getPerformanceSettings();
    const projectsToShow = projects.slice(0, settings.maxProjects);
    projectMeshesRef.current = [];

    // Gallery layout: Circular arrangement
    const radius = 8;
    const angleStep = (Math.PI * 2) / projectsToShow.length;

    projectsToShow.forEach((project, index) => {
      // Create project card geometry
      const geometry = new THREE.PlaneGeometry(3, 3);
      const texture = createProjectTexture(project);

      const material = new THREE.MeshLambertMaterial({
        map: texture,
        transparent: true,
        side: THREE.DoubleSide
      });

      const mesh = new THREE.Mesh(geometry, material);

      // Position in circle
      const angle = index * angleStep;
      mesh.position.x = Math.cos(angle) * radius;
      mesh.position.z = Math.sin(angle) * radius;
      mesh.position.y = Math.sin(index * 0.5) * 2; // Varying heights

      // Face center
      mesh.lookAt(0, mesh.position.y, 0);

      // Store project data
      (mesh as any).projectData = project;
      (mesh as any).originalPosition = mesh.position.clone();
      (mesh as any).originalRotation = mesh.rotation.clone();

      if (settings.enableShadows) {
        mesh.castShadow = true;
        mesh.receiveShadow = true;
      }

      projectMeshesRef.current.push(mesh);
      sceneRef.current!.add(mesh);

      // Add glow effect for featured projects
      if (project.featured) {
        const glowGeometry = new THREE.PlaneGeometry(3.2, 3.2);
        const glowMaterial = new THREE.MeshBasicMaterial({
          color: theme === 'matrix' ? 0x00ff00 : 0x0088ff,
          transparent: true,
          opacity: 0.3,
          side: THREE.DoubleSide
        });
        const glowMesh = new THREE.Mesh(glowGeometry, glowMaterial);
        glowMesh.position.copy(mesh.position);
        glowMesh.position.z -= 0.01; // Slightly behind
        glowMesh.rotation.copy(mesh.rotation);
        sceneRef.current!.add(glowMesh);
      }
    });
  }, [projects, theme, createProjectTexture, getPerformanceSettings]);

  // Handle mouse movement for interaction
  const handleMouseMove = useCallback((event: MouseEvent) => {
    if (!mountRef.current || !raycasterRef.current || !cameraRef.current) return;

    const rect = mountRef.current.getBoundingClientRect();
    mouseRef.current.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    mouseRef.current.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

    // Raycasting for hover effects
    raycasterRef.current.setFromCamera(mouseRef.current, cameraRef.current);
    const intersects = raycasterRef.current.intersectObjects(projectMeshesRef.current);

    if (intersects.length > 0) {
      const hoveredMesh = intersects[0].object as THREE.Mesh;
      const projectData = (hoveredMesh as any).projectData;

      if (projectData && hoveredProject !== projectData.id) {
        setHoveredProject(projectData.id);

        // Hover animation
        hoveredMesh.scale.setScalar(1.1);
        hoveredMesh.position.z += 0.5;
      }
    } else {
      if (hoveredProject) {
        // Reset all meshes
        projectMeshesRef.current.forEach(mesh => {
          mesh.scale.setScalar(1);
          mesh.position.copy((mesh as any).originalPosition);
        });
        setHoveredProject(null);
      }
    }
  }, [hoveredProject]);

  // Handle click for project selection
  const handleClick = useCallback((event: MouseEvent) => {
    if (!raycasterRef.current || !cameraRef.current) return;

    raycasterRef.current.setFromCamera(mouseRef.current, cameraRef.current);
    const intersects = raycasterRef.current.intersectObjects(projectMeshesRef.current);

    if (intersects.length > 0) {
      const clickedMesh = intersects[0].object as THREE.Mesh;
      const projectData = (clickedMesh as any).projectData;

      if (projectData) {
        setSelectedProject(projectData.id);
        onProjectSelect?.(projectData);

        // Selection animation
        clickedMesh.scale.setScalar(1.2);
        setTimeout(() => {
          clickedMesh.scale.setScalar(1);
        }, 200);
      }
    }
  }, [onProjectSelect]);

  // Animation loop
  const animate = useCallback(() => {
    if (!sceneRef.current || !rendererRef.current || !cameraRef.current) return;

    timeRef.current += 0.016;

    // Auto-rotate camera
    if (autoRotate) {
      const radius = 10;
      cameraRef.current.position.x = Math.cos(timeRef.current * 0.1) * radius;
      cameraRef.current.position.z = Math.sin(timeRef.current * 0.1) * radius;
      cameraRef.current.lookAt(0, 0, 0);
    }

    // Floating animation for project cards
    projectMeshesRef.current.forEach((mesh, index) => {
      if (hoveredProject !== (mesh as any).projectData?.id) {
        const originalY = (mesh as any).originalPosition.y;
        mesh.position.y = originalY + Math.sin(timeRef.current * 2 + index) * 0.1;
        mesh.rotation.y = Math.sin(timeRef.current * 0.5 + index) * 0.05;
      }
    });

    rendererRef.current.render(sceneRef.current, cameraRef.current);
    animationRef.current = requestAnimationFrame(animate);
  }, [autoRotate, hoveredProject]);

  // Handle resize
  const handleResize = useCallback(() => {
    if (!cameraRef.current || !rendererRef.current) return;

    cameraRef.current.aspect = window.innerWidth / window.innerHeight;
    cameraRef.current.updateProjectionMatrix();
    rendererRef.current.setSize(window.innerWidth, window.innerHeight);
  }, []);

  // Initialize on mount
  useEffect(() => {
    initializeScene();
    animate();

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('click', handleClick);
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleClick);
      window.removeEventListener('resize', handleResize);

      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }

      if (rendererRef.current && mountRef.current?.contains(rendererRef.current.domElement)) {
        mountRef.current.removeChild(rendererRef.current.domElement);
      }

      if (rendererRef.current) {
        rendererRef.current.dispose();
      }
    };
  }, [initializeScene, animate, handleMouseMove, handleClick, handleResize]);

  // Update scene when projects or theme changes
  useEffect(() => {
    if (sceneRef.current && projectMeshesRef.current.length > 0) {
      // Clear existing meshes
      projectMeshesRef.current.forEach(mesh => {
        sceneRef.current!.remove(mesh);
        mesh.geometry.dispose();
        (mesh.material as THREE.Material).dispose();
      });
      createProjectGallery();
    }
  }, [projects, theme, createProjectGallery]);

  return (
    <div
      ref={mountRef}
      style={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        overflow: 'hidden',
        cursor: hoveredProject ? 'pointer' : 'default'
      }}
      aria-label="3D Project Gallery"
    >
      {/* Project info overlay */}
      {hoveredProject && (
        <div
          style={{
            position: 'absolute',
            top: '20px',
            left: '20px',
            background: theme === 'matrix' ? 'rgba(0, 50, 0, 0.9)' : 'rgba(0, 0, 0, 0.8)',
            color: theme === 'matrix' ? '#00ff00' : '#ffffff',
            padding: '20px',
            borderRadius: '8px',
            border: theme === 'matrix' ? '2px solid #00ff00' : '1px solid #333',
            fontFamily: 'monospace',
            maxWidth: '300px',
            zIndex: 10,
            animation: 'fadeIn 0.3s ease-out'
          }}
        >
          {(() => {
            const project = projects.find(p => p.id === hoveredProject);
            return project ? (
              <>
                <h3 style={{ margin: '0 0 10px 0', fontSize: '18px' }}>{project.title}</h3>
                <p style={{ margin: '0 0 10px 0', fontSize: '14px', opacity: 0.8 }}>
                  {project.description}
                </p>
                <div style={{ fontSize: '12px', opacity: 0.6 }}>
                  {project.tags.join(' • ')}
                </div>
              </>
            ) : null;
          })()}
        </div>
      )}

      {/* Controls hint */}
      <div
        style={{
          position: 'absolute',
          bottom: '20px',
          right: '20px',
          color: theme === 'matrix' ? '#00ff00' : '#ffffff',
          fontFamily: 'monospace',
          fontSize: '12px',
          opacity: 0.6,
          zIndex: 10
        }}
      >
        Hover: View project • Click: Select project
        {autoRotate && ' • Auto-rotating view'}
      </div>
    </div>
  );
};