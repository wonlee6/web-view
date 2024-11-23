import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between space-y-4">
        <h1 className="text-4xl font-bold">Welcome to Next.js in WebView!</h1>
        <p className="text-xl text-muted-foreground">
          This is a Next.js app running inside a React Native WebView.
        </p>
        <div className="flex gap-4">
          <Button>Default Button</Button>
          <Button variant="destructive">Destructive Button</Button>
          <Button variant="outline">Outline Button</Button>
          <Button variant="secondary">Secondary Button</Button>
          <Button variant="ghost">Ghost Button</Button>
          <Button variant="link">Link Button</Button>
        </div>
      </div>
    </main>
  );
}
