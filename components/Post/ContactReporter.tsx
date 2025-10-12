"use client";

import { useState } from "react";
import { Copy } from "lucide-react";

interface ContactReporterProps {
  name: string;
  email: string;
}

export default function ContactReporter({ name, email }: ContactReporterProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-primary/5 dark:bg-primary/10 p-6 rounded-lg self-start w-full">
      <h2 className="text-xl font-bold mb-4">Contact Reporter</h2>
      <div className="space-y-4">
        <div>
          <p className="text-sm font-medium text-black/80 dark:text-white/80">
            Name
          </p>
          <p className="text-base text-black dark:text-white">{name}</p>
        </div>
        <div>
          <p className="text-sm font-medium text-black/80 dark:text-white/80">
            Email
          </p>
          <div className="flex items-center justify-between">
            <p className="text-base text-black dark:text-white truncate">
              {email}
            </p>
            <button
              onClick={handleCopy}
              className="flex items-center text-primary hover:opacity-80"
              title="Copy email"
            >
              {copied ? (
                <span className="text-sm text-green-500">✔</span>
              ) : (
                <Copy size={18} />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
