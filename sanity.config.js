import { defineConfig } from 'sanity';
import { deskTool } from 'sanity/desk';
import { schemaTypes } from './sanity/schemas';

export default defineConfig({
  name: 'bloomia-studio',
  title: 'Bloomia Club Content Studio',

  projectId: process.env.REACT_APP_SANITY_PROJECT_ID || '7yjhdw88',
  dataset: process.env.REACT_APP_SANITY_DATASET || 'production',

  plugins: [deskTool()],

  schema: {
    types: schemaTypes,
  },

  // Hash-based routing for embedded Studio or SPA to avoid AbortError
  router: {
    history: 'hash',
  },
});
