<img src='https://socialify.git.ci/zourdyzou/arkscapes/image?description=1&font=Source%20Code%20Pro&issues=1&language=1&name=1&owner=1&pattern=Charlie%20Brown&pulls=1&theme=Dark' />

## ๐ช Features

- โก๏ธ Webpack
- โ๏ธ React 
- โ TypeScript
- ๐ ESLint โ To find and fix problems in your code
- ๐ Prettier โ Code Formatter for consistent style
- ๐ถ Husky โ For running scripts before committing
- ๐ Commitlint โ To make sure the commit messages follow the convention
- ๐ Renovate โ To keep the dependencies up to date
- ๐ซ lint-staged โ Run ESLint and Prettier against staged Git files
- ๐ท CI/CD - Deploy the application easily using Github Workflows
- โ๏ธ EditorConfig - Consistent coding styles across editors and IDEs
- ๐ Path Mapping โ Import components or images using the `@` prefix

## ๐  Data Sources
The information and data used in Cryptoscapes is provided kindly by the following sources:

- [CoinGecko][5]
- [ETH Gas Station][6]
- [Alternative.me][7]
- [Blockchain.com][8]


## ๐ฏ TODO: some of the things that needs to be working on.

- [ ] Add internationalization features (๐ Third-party? or file-based?)
- [ ] Optimize bundling runtime, maybe Bun? (๐ก Good-to-go but not important)
- [ ] SEO custom components, meta-data and json-ld (๐งช SEO optimization on google ranking)
- [ ] Image and Icon custom components that comply that WAI-ARIA convention
- [ ] Web Accessibility pre-caution for DX (๐ฐ Quite a feat)

## ๐ Documentation

### Requirements

- Node.js >= 14.16.0


### Directory Structure

- [`.github`](.github) โ GitHub configuration including the CI workflow.<br>
- [`webpack`](./webpack) โ Webpack configuration and bundling rules to compile it as a static files.<br>
- [`test`](./test) โ Test rules and configuration: TDD.<br>
- [`public`](./public) โ Static assets such as robots.txt, images, and favicon.<br>
- [`src`](./src) โ Application source code, including pages, components, styles.

### Scripts

- `yarn run dev` โ Starts the application in development mode at `http://localhost:3000`.
- `yarn run build` โ Creates an optimized production build of your application.
- `yarn run start` โ Starts the application in production mode.
<!-- - `pnpm type-check` โ Validate code using TypeScript compiler. -->
<!-- - `pnpm lint` โ Runs ESLint for all files in the `src` directory. -->
<!-- - `pnpm format` โ Runs Prettier for all files in the `src` directory. -->

### Path Mapping

TypeScript are pre-configured with custom path mappings. To import components or files, use the `@` prefix.

```tsx
import { Button } from '@/components/Button';
// To import images or other files from the public folder
import avatar from '@/public/avatar.png';
```

### Switch to Yarn/npm

This starter uses pnpm by default, but this choice is yours. If you'd like to switch to Yarn/npm, delete the `yarn.lock` file, install the dependencies with Yarn/npm, change the CI workflow, and Husky Git hooks to use Yarn/npm commands.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for more information.

## ๐ Recent Development Preview (Updated every 24-h)

![Arkscapes-Cryptocurrency-Prices-Charts-and-Market-Overview](https://user-images.githubusercontent.com/69587933/192398288-be68436d-9729-4564-bd9f-60444a68aba0.png)






[1]: https://cryptoscapes.org
[2]: https://https://redux.js.org/
[3]: https://atomicdesign.bradfrost.com/chapter-2/#:~:text=Atomic%20design%20is%20atoms%2C%20molecules,parts%20at%20the%20same%20time.
[4]: https://cryptoscapes.org/trends
[5]: https://www.coingecko.com/
[6]: https://ethgasstation.info/
[7]: https://alternative.me/
[8]: https://www.blockchain.com/
[9]: https://github.com/leonardtng/cryptoscapes/projects/1
[10]: https://leonardtng.com
