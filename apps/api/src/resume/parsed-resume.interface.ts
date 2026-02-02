export interface ParsedResume {
    text: string;
    sections: {
        personal_info?: string;
        summary?: string;
        experience?: string[];
        education?: string[];
        skills?: string[];
        projects?: string[];
        [key: string]: any;
    };
    keywords: string[];
    email?: string;
    phone?: string;
    links?: string[];
}
