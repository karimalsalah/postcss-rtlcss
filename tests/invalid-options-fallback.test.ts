/// <reference types="jest" />
import postcss from 'postcss';
import postcssRTLCSS from '../src';
import { initStore, store } from '../src/data/store';
import { PluginOptions } from '../src/@types';

const CSS = '.a { margin-left: 1px; }';

const transform = (options: PluginOptions): string => postcss([postcssRTLCSS(options)]).process(CSS).css;

const defaultOutput = transform({});

const DEFAULT_PREFIXES = {
    ltrPrefix: '[dir="ltr"]',
    rtlPrefix: '[dir="rtl"]',
    bothPrefix: '[dir]'
};

type PrefixOption = keyof typeof DEFAULT_PREFIXES;

describe('Invalid option values fall back to the defaults', (): void => {

    it.each<[PrefixOption, unknown]>([
        ['ltrPrefix', ''],
        ['ltrPrefix', []],
        ['rtlPrefix', ''],
        ['rtlPrefix', []],
        ['bothPrefix', ''],
        ['bothPrefix', []],
        ['bothPrefix', ['[dir]', '']]
    ])('%s set to %j falls back to the default prefix', (option: PrefixOption, value: unknown): void => {
        initStore({ [option]: value } as unknown as PluginOptions);
        expect(store.options[option]).toBe(DEFAULT_PREFIXES[option]);
    });

    it('an empty ltrPrefix keeps flipping rules instead of disabling it', (): void => {
        expect(transform({ ltrPrefix: '' })).toBe(defaultOutput);
    });

    it('an empty ltrPrefix array does not emit a selector-less rule', (): void => {
        expect(transform({ ltrPrefix: [] })).toBe(defaultOutput);
    });

    it.each([
        [null],
        [undefined]
    ])('processDeclarationPlugins with a %p entry uses the default plugins', (entry: null | undefined): void => {
        expect(transform({
            processDeclarationPlugins: [entry] as unknown as PluginOptions['processDeclarationPlugins']
        })).toBe(defaultOutput);
    });

    it.each([
        [5],
        [true],
        ['abc'],
        [['a']]
    ])('aliases set to %j uses the default aliases', (value: unknown): void => {
        initStore({ aliases: value as unknown as Record<string, string> });
        expect(store.options.aliases).toEqual({});
    });

});
