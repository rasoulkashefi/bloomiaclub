import 'react';

export interface WebMCPToolAnnotations {
  readOnlyHint?: boolean;
  destructiveHint?: boolean;
  idempotentHint?: boolean;
}

export interface WebMCPToolDefinition {
  name: string;
  title?: string;
  description: string;
  inputSchema: {
    type: 'object';
    properties: Record<string, unknown>;
    required?: string[];
    additionalProperties?: boolean;
  };
  annotations?: WebMCPToolAnnotations;
  execute: (input: Record<string, unknown>, client?: unknown) => Promise<unknown> | unknown;
}

export interface WebMCPModelContext {
  registerTool: (
    tool: WebMCPToolDefinition,
    options?: { signal?: AbortSignal }
  ) => Promise<void> | void;
  unregisterTool?: (name: string) => void;
}

declare global {
  interface Navigator {
    modelContext?: WebMCPModelContext;
  }
  interface Document {
    modelContext?: WebMCPModelContext;
  }
}

declare module 'react' {
  interface FormHTMLAttributes<T> {
    toolname?: string;
    tooldescription?: string;
    toolautosubmit?: boolean | string;
  }
}
