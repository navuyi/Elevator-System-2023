declare module "*.css"
declare module "*.scss"


/**
 * Global Window interface declaration
 * in order to use custom API from preload.ts file 
*/
declare interface Window {
    electron: {
        store: {
            get: (key: string) => any;
            set: (key: string, val: any) => void;
            clear: () => void;
            // any other methods you've defined...
        };
        signal: {
            redirect_to_diva: () => void;
            redirect_to_main: () => void;
            set_fullscreen: (flag: boolean) => void;
        };
        result: {
            save: (details: T_RESULT_EVALUATED, summary: T_RESULT_EVALUATED_SUMMARY, dir_name:string, name: string) => void;
            re_evaluate: (cutoff: number) => Promise<object>
        }
    };
}
