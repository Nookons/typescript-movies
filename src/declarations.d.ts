declare module '*.module.css' {
    const classes: { [key: string]: string };
    export default classes;
}

// src/declarations.d.ts
declare module '*.svg' {
    const content: any;
    export default content;
}

declare module 'react-slick' {
    const Slider: any;
    export default Slider;
}


