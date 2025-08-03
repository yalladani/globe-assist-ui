import type { Meta, StoryObj } from '@storybook/react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';

const meta: Meta<typeof Card> = {
  title: 'UI/Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>כרטיס דוגמה</CardTitle>
        <CardDescription>תיאור של הכרטיס</CardDescription>
      </CardHeader>
      <CardContent>
        <p>תוכן הכרטיס יופיע כאן.</p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">ביטול</Button>
        <Button>אישור</Button>
      </CardFooter>
    </Card>
  ),
};

export const Simple: Story = {
  render: () => (
    <Card className="w-[300px]">
      <CardHeader>
        <CardTitle>כרטיס פשוט</CardTitle>
      </CardHeader>
      <CardContent>
        <p>כרטיס עם תוכן בלבד.</p>
      </CardContent>
    </Card>
  ),
};

export const WithImage: Story = {
  render: () => (
    <Card className="w-[400px]">
      <CardHeader>
        <CardTitle>כרטיס עם תמונה</CardTitle>
        <CardDescription>כרטיס שמציג תמונה</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="w-full h-48 bg-gray-200 rounded-md flex items-center justify-center">
          <span className="text-gray-500">תמונה</span>
        </div>
        <p className="mt-4">תיאור של התמונה.</p>
      </CardContent>
      <CardFooter>
        <Button className="w-full">צפה</Button>
      </CardFooter>
    </Card>
  ),
}; 