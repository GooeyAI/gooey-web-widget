import { HTMLReactParserOptions } from 'html-react-parser';
import { default as React } from 'react';

export declare const findSourceIcon: (contentType: string, url: string, size?: number) => JSX.ElementType | null;
export declare function extractFileDetails(str: string): {
    mainString: string;
    extension: string;
} | {
    mainString: string;
    extension: null;
};
export declare function extractMainDomain(url: string): string[] | null | undefined;
export declare const fetchUrlMeta: (url: string) => Promise<any>;
export declare const getReactParserOptions: (data: any) => HTMLReactParserOptions;
export declare const formatTextResponse: (data: any, linkColor: string, showSources: boolean) => string | React.JSX.Element | React.JSX.Element[];
export declare const getFeedbackButtonIcon: (title: string, isFilled: boolean) => import("react/jsx-runtime").JSX.Element | null;
export declare function truncateMiddle(str: string, charLimit: number): string;
export declare const getEmbedUrl: (url: string) => string;
