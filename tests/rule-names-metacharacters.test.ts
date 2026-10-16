/// <reference types="jest" />
import postcss from 'postcss';
import postcssRTLCSS from '../src';
import { PluginOptions } from '../src/@types';

const CSS = '.left { margin-left: 1px; } .right { margin-right: 1px; } .plain { color: red; }';

const transform = (options: PluginOptions): string => postcss([postcssRTLCSS(options)]).process(CSS).css;

describe('processRuleNames with regex metacharacters in stringMap', (): void => {

    it('does not throw and flips rule names the same as without the extra entry', (): void => {
        const withMetacharacters = transform({
            processRuleNames: true,
            stringMap: [{ search: 'c(', replace: 'd' }]
        });
        expect(withMetacharacters).toBe(transform({ processRuleNames: true }));
    });

});
