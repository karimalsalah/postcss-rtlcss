/// <reference types="jest" />
import postcss from 'postcss';
import postcssRTLCSS from '../src';

const transform = (css: string): string => postcss([postcssRTLCSS({ processKeyFrames: true })]).process(css).css;

const KEYFRAMES = '{ from { margin-left: 0 } to { margin-left: 10px } }';

describe('processKeyFrames with quoted keyframes names', (): void => {

    it('does not throw when a quoted name contains regex metacharacters', (): void => {
        const output = transform(`@keyframes "a(" ${KEYFRAMES} .x { animation: none 1s }`);
        expect(output).toContain('@keyframes "a(-ltr"');
        expect(output).toContain('@keyframes "a(-rtl"');
    });

    it('keeps the direction suffix inside the quotes and flips unquoted references', (): void => {
        const output = transform(`@keyframes "slide" ${KEYFRAMES} .x { animation: slide 1s }`);
        expect(output).toContain('@keyframes "slide-ltr"');
        expect(output).toContain('@keyframes "slide-rtl"');
        expect(output).not.toContain('"slide"-ltr');
        expect(output).toContain('[dir="ltr"] .x { animation: slide-ltr 1s }');
        expect(output).toContain('[dir="rtl"] .x { animation: slide-rtl 1s }');
    });

    it('flips quoted references and single-quoted names', (): void => {
        const output = transform(`@keyframes 'slide' ${KEYFRAMES} .x { animation: 'slide' 1s }`);
        expect(output).toContain("@keyframes 'slide-ltr'");
        expect(output).toContain("@keyframes 'slide-rtl'");
        expect(output).toContain(`[dir="ltr"] .x { animation: 'slide-ltr' 1s }`);
        expect(output).toContain(`[dir="rtl"] .x { animation: 'slide-rtl' 1s }`);
    });

});
