import { expandTemplate } from '../util/helpers';

/* Breakpoints */
const breakpoints = {
    // xsm - 320
    xsm: (style, ...values) => `@media only screen and (max-width: 359px) { ${expandTemplate(style, values)} }`,
    // smm - 360
    smm: (style, ...values) => `@media only screen and (min-width: 360px) and (max-width: 410px) { ${expandTemplate(style, values)} }`,
    // mdm - 411
    mdm: (style, ...values) => `@media only screen and (min-width: 411px) and (max-width: 479px) { ${expandTemplate(style, values)} }`,
    // lgm - 480
    lgm: (style, ...values) => `@media only screen and (min-width: 480px) and (max-width: 599px) { ${expandTemplate(style, values)} }`,

    // smt - 600
    smt: (style, ...values) => `@media only screen and (min-width: 600px) and (max-width: 767px) { ${expandTemplate(style, values)} }`,
    // mdt - 768
    mdt: (style, ...values) => `@media only screen and (min-width: 768px) and (max-width: 959px) { ${expandTemplate(style, values)} }`,
    // lgt - 960
    lgt: (style, ...values) => `@media only screen and (min-width: 960px) and (max-width: 1279px) { ${expandTemplate(style, values)} }`,

    // smd - 1280
    smd: (style, ...values) => `@media only screen and (min-width: 1280px) and (max-width: 1439px) { ${expandTemplate(style, values)} }`,
    // mdd - 1440
    mdd: (style, ...values) => `@media only screen and (min-width: 1440px) and (max-width: 1919px) { ${expandTemplate(style, values)} }`,
    // lgd - 1920
    lgd: (style, ...values) => `@media only screen and (min-width: 1920px) and (max-width: 2559px) { ${expandTemplate(style, values)} }`,
    // xld - 2560
    xld: (style, ...values) => `@media only screen and (min-width: 2560px) { ${expandTemplate(style, values)} }`,

    mobile: (style, ...values) => `@media only screen and (max-width: 599px) { ${expandTemplate(style, values)} }`,
    tablet: (style, ...values) => `@media only screen and (min-width: 600px) and (max-width: 1279px) { ${expandTemplate(style, values)} }`,
    desktop: (style, ...values) => `@media only screen and (min-width: 1280px) { ${expandTemplate(style, values)} }`,

    vsm: (style, ...values) => `@media only screen and (max-height: 600px) { ${expandTemplate(style, values)} }`,
    vmd: (style, ...values) => `@media only screen and (min-height: 600px) and (max-height: 750px) { ${expandTemplate(style, values)} }`,
    vlg: (style, ...values) => `@media only screen and (min-height: 750px) and (max-height: 900px) { ${expandTemplate(style, values)} }`,
    vxlg: (style, ...values) => `@media only screen and (min-height: 900px) { ${expandTemplate(style, values)} }`,
};

export default breakpoints;