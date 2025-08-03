import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Switch } from './ui/switch';
import { Checkbox } from './ui/checkbox';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';
import { Separator } from './ui/separator';
import { Alert, AlertDescription } from './ui/alert';
import { Progress } from './ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

const ComponentGallery: React.FC = () => {
  return (
    <div className="container mx-auto p-6 space-y-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4">Component Gallery - Globe Assist UI</h1>
        <p className="text-lg text-muted-foreground">Catalog of all available components in the platform</p>
      </div>

      {/* Buttons Section */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Buttons</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Primary Button</CardTitle>
            </CardHeader>
            <CardContent>
              <Button>Primary Button</Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Secondary Button</CardTitle>
            </CardHeader>
            <CardContent>
              <Button variant="secondary">Secondary Button</Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Outline Button</CardTitle>
            </CardHeader>
            <CardContent>
              <Button variant="outline">Outline Button</Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Destructive Button</CardTitle>
            </CardHeader>
            <CardContent>
              <Button variant="destructive">Destructive Button</Button>
            </CardContent>
          </Card>
        </div>
      </section>

      <Separator />

      {/* Form Components Section */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Form Components</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Input Fields</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="Enter your email" />
              </div>
              <div>
                <Label htmlFor="textarea">Text Area</Label>
                <Textarea id="textarea" placeholder="Enter long text here" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Selection Components</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox id="terms" />
                <Label htmlFor="terms">I agree to the terms</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch id="airplane-mode" />
                <Label htmlFor="airplane-mode">Airplane Mode</Label>
              </div>
              
              <RadioGroup defaultValue="option-one">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="option-one" id="option-one" />
                  <Label htmlFor="option-one">First Option</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="option-two" id="option-two" />
                  <Label htmlFor="option-two">Second Option</Label>
                </div>
              </RadioGroup>
            </CardContent>
          </Card>
        </div>
      </section>

      <Separator />

      {/* Display Components Section */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Display Components</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Badges</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Badge>Default Badge</Badge>
              <Badge variant="secondary">Secondary Badge</Badge>
              <Badge variant="destructive">Destructive Badge</Badge>
              <Badge variant="outline">Outline Badge</Badge>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Avatars</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>DG</AvatarFallback>
              </Avatar>
              <Avatar>
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Progress</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Progress value={33} />
              <Progress value={66} />
              <Progress value={100} />
            </CardContent>
          </Card>
        </div>
      </section>

      <Separator />

      {/* Feedback Components Section */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Feedback Components</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Alert>
            <AlertDescription>
              This is a regular alert with important information for the user.
            </AlertDescription>
          </Alert>
          
          <Card>
            <CardHeader>
              <CardTitle>Tabs</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="account" className="w-[400px]">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="account">Account</TabsTrigger>
                  <TabsTrigger value="password">Password</TabsTrigger>
                </TabsList>
                <TabsContent value="account">
                  Information about your account.
                </TabsContent>
                <TabsContent value="password">
                  Change your password.
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </section>

      <Separator />

      {/* Layout Components Section */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Layout Components</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Simple Card</CardTitle>
              <CardDescription>Card with basic content</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Card content will appear here.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Card with Actions</CardTitle>
              <CardDescription>Card with action buttons</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Card content.</p>
            </CardContent>
            <div className="flex justify-end space-x-2 p-6 pt-0">
              <Button variant="outline">Cancel</Button>
              <Button>Confirm</Button>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default ComponentGallery; 