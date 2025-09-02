import { DocumentTextIcon } from "@/components/icons";

export default function Header() {
  return (
    <header className="border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <DocumentTextIcon className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold font-headline">ResumeAce</h1>
          </div>
        </div>
      </div>
    </header>
  );
}
