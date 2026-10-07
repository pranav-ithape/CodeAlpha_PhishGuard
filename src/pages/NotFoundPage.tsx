import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldAlert, ArrowLeft } from 'lucide-react';
import { Button } from '../components/ui/button';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="max-w-md mx-auto py-24 text-center space-y-5">
      <div className="inline-flex h-14 w-14 items-center justify-center rounded-xl bg-brick/15 text-brick">
        <ShieldAlert className="h-7 w-7" />
      </div>
      <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground font-mono">
        404 — Specimen Not Found
      </h1>
      <p className="text-sm text-muted-foreground leading-relaxed">
        The requested educational lesson or simulation route does not exist or has been relocated within the training syllabus.
      </p>
      <div>
        <Link to="/dashboard">
          <Button variant="default" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            <span>Return to Dashboard</span>
          </Button>
        </Link>
      </div>
    </div>
  );
};
