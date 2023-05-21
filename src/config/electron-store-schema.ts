/**
 * Schema is used in the main index.ts file when initializing electron-store
*/



export const ELECTRON_STORE_SCHEMA = {
    experiment_settings: {
        type: "object",
        properties: {
           
        },
        default: {}
    }
} as const

