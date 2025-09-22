import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { cn, cyberpunkGlow, matrixAnimation } from '@/lib/utils';

export const ShadcnDemoPage: React.FC = () => {
  const [inputValue, setInputValue] = useState('');
  const [showAlert, setShowAlert] = useState(false);

  const handleDemoClick = () => {
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
  };

  return (
    <div className="min-h-screen bg-black text-matrix-green p-6">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4 mb-12">
          <h1 className="text-4xl font-bold font-mono text-matrix-green matrix-glow">
            shadcn/ui + Matrix Theme Demo
          </h1>
          <p className="text-lg text-matrix-green/80 font-mono">
            Exploring how shadcn/ui components integrate with our cyberpunk aesthetic
          </p>
        </div>

        {/* Alert Demo */}
        {showAlert && (
          <div className="mb-6">
            <Alert variant="matrix" className={matrixAnimation('glow')}>
              <AlertTitle className="font-mono">System Alert</AlertTitle>
              <AlertDescription className="font-mono">
                Matrix components are functioning at optimal levels. Welcome to the future.
              </AlertDescription>
            </Alert>
          </div>
        )}

        {/* Button Showcase */}
        <Card className="card-matrix">
          <CardHeader>
            <CardTitle className="text-matrix-green font-mono text-2xl">Button Components</CardTitle>
            <CardDescription className="text-matrix-green/70 font-mono">
              Various button styles adapted for the Matrix theme
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-wrap gap-4">
              <Button variant="matrix" onClick={handleDemoClick}>
                Matrix Primary
              </Button>
              <Button variant="outline" className="border-matrix-green text-matrix-green hover:bg-matrix-green hover:text-black">
                Matrix Outline
              </Button>
              <Button variant="ghost" className="text-matrix-green hover:bg-matrix-green/10">
                Matrix Ghost
              </Button>
              <Button variant="secondary" className="bg-matrix-green/20 text-matrix-green hover:bg-matrix-green/30">
                Matrix Secondary
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Input Components */}
        <Card className="card-matrix">
          <CardHeader>
            <CardTitle className="text-matrix-green font-mono text-2xl">Input Components</CardTitle>
            <CardDescription className="text-matrix-green/70 font-mono">
              Form inputs with cyberpunk styling
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-mono text-matrix-green">Matrix Input</label>
                <Input
                  placeholder="Enter the Matrix..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  className="input-matrix"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-mono text-matrix-green">Password</label>
                <Input
                  type="password"
                  placeholder="••••••••"
                  className="input-matrix"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Card Showcase */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className={cn("card-matrix", matrixAnimation('interactive'))}>
            <CardHeader>
              <CardTitle className="text-matrix-green font-mono">Neo's Terminal</CardTitle>
              <CardDescription className="text-matrix-green/70 font-mono">
                Access granted to mainframe
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 font-mono text-sm">
                <div className="flex justify-between">
                  <span>Status:</span>
                  <span className="text-matrix-green">ONLINE</span>
                </div>
                <div className="flex justify-between">
                  <span>Access Level:</span>
                  <span className="text-matrix-green">ROOT</span>
                </div>
                <div className="flex justify-between">
                  <span>Security:</span>
                  <span className="text-matrix-green">ENCRYPTED</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="matrix" size="sm" className="w-full">
                Access Terminal
              </Button>
            </CardFooter>
          </Card>

          <Card className={cn("card-matrix", matrixAnimation('interactive'))}>
            <CardHeader>
              <CardTitle className="text-matrix-green font-mono">System Diagnostics</CardTitle>
              <CardDescription className="text-matrix-green/70 font-mono">
                Real-time system monitoring
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 font-mono text-sm">
                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span>CPU Usage</span>
                    <span className="text-matrix-green">67%</span>
                  </div>
                  <div className="w-full bg-black border border-matrix-green/30 rounded-full h-2">
                    <div className="bg-matrix-green h-2 rounded-full shadow-matrix" style={{ width: '67%' }}></div>
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span>Memory</span>
                    <span className="text-matrix-green">84%</span>
                  </div>
                  <div className="w-full bg-black border border-matrix-green/30 rounded-full h-2">
                    <div className="bg-matrix-green h-2 rounded-full shadow-matrix" style={{ width: '84%' }}></div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" size="sm" className="w-full border-matrix-green text-matrix-green hover:bg-matrix-green hover:text-black">
                View Details
              </Button>
            </CardFooter>
          </Card>

          <Card className={cn("card-matrix", matrixAnimation('interactive'))}>
            <CardHeader>
              <CardTitle className="text-matrix-green font-mono">Code Execution</CardTitle>
              <CardDescription className="text-matrix-green/70 font-mono">
                Run Matrix algorithms
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-black border border-matrix-green/30 rounded p-3 font-mono text-xs text-matrix-green">
                <div className="mb-2 text-matrix-green/60">// Matrix code snippet</div>
                <div>function wakeUp() {'{'}  </div>
                <div>&nbsp;&nbsp;reality.question();</div>
                <div>&nbsp;&nbsp;return choice;</div>
                <div>{'}'}</div>
              </div>
            </CardContent>
            <CardFooter className="flex gap-2">
              <Button variant="matrix" size="sm" className="flex-1">
                Execute
              </Button>
              <Button variant="ghost" size="sm" className="flex-1 text-matrix-green hover:bg-matrix-green/10">
                Debug
              </Button>
            </CardFooter>
          </Card>
        </div>

        {/* Theme Comparison */}
        <Card className="card-matrix">
          <CardHeader>
            <CardTitle className="text-matrix-green font-mono text-2xl">Theme Integration</CardTitle>
            <CardDescription className="text-matrix-green/70 font-mono">
              How shadcn/ui adapts to our cyberpunk aesthetic
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-mono text-matrix-green">Matrix Theme Benefits</h3>
                <ul className="space-y-2 font-mono text-sm text-matrix-green/80">
                  <li className="flex items-center gap-2">
                    <span className="text-matrix-green">▸</span>
                    Cyberpunk aesthetic maintained
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-matrix-green">▸</span>
                    Enhanced accessibility features
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-matrix-green">▸</span>
                    Consistent design system
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-matrix-green">▸</span>
                    Rapid development workflow
                  </li>
                </ul>
              </div>
              <div className="space-y-4">
                <h3 className="text-lg font-mono text-matrix-green">Technical Features</h3>
                <ul className="space-y-2 font-mono text-sm text-matrix-green/80">
                  <li className="flex items-center gap-2">
                    <span className="text-matrix-green">▸</span>
                    TypeScript support out of the box
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-matrix-green">▸</span>
                    Tailwind CSS integration
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-matrix-green">▸</span>
                    Customizable component variants
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-matrix-green">▸</span>
                    Radix UI accessibility primitives
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Interactive Demo Section */}
        <Card className="card-matrix">
          <CardHeader>
            <CardTitle className="text-matrix-green font-mono text-2xl">Interactive Demo</CardTitle>
            <CardDescription className="text-matrix-green/70 font-mono">
              Test the components in real-time
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-mono text-matrix-green">Your Input</label>
                <Input
                  placeholder="Type something..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  className="input-matrix"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-mono text-matrix-green">Output</label>
                <div className="h-10 bg-black border border-matrix-green/30 rounded-md px-3 py-2 font-mono text-sm text-matrix-green">
                  {inputValue || 'Waiting for input...'}
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="matrix" onClick={handleDemoClick}>
                Trigger Alert
              </Button>
              <Button
                variant="outline"
                onClick={() => setInputValue('')}
                className="border-matrix-green text-matrix-green hover:bg-matrix-green hover:text-black"
              >
                Clear Input
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center py-8 border-t border-matrix-green/30">
          <p className="font-mono text-matrix-green/60">
            shadcn/ui × Matrix Theme Integration Demo
          </p>
          <p className="font-mono text-sm text-matrix-green/40 mt-2">
            The future of component libraries is here
          </p>
        </div>
      </div>
    </div>
  );
};