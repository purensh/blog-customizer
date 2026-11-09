import { defaultArticleState } from '@/constants/articleProps.ts';
import { clsx } from 'clsx';
import { useState } from 'react';

import { ArticleParamsForm } from '@components/article-params-form';

import { Article } from '../article/Article';

import type { ArticleStateType } from '@/constants/articleProps.ts';
import type { CSSProperties } from 'react';

import styles from './app.module.scss';

export const App = (): React.JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);
  const [articleState, setArticleState] =
    useState<ArticleStateType>(defaultArticleState);

  const isWide =
    articleState.contentWidth.value === defaultArticleState.contentWidth.value;

  return (
    <main
      className={clsx(styles.main)}
      style={
        {
          '--font-family': articleState.fontFamilyOption.value,
          '--font-size': articleState.fontSizeOption.value,
          '--font-color': articleState.fontColor.value,
          '--container-width': articleState.contentWidth.value,
          '--article-width': isWide ? 'none' : articleState.contentWidth.value,
          '--bg-color': articleState.backgroundColor.value,
        } as CSSProperties
      }
    >
      <ArticleParamsForm
        isOpen={isOpen}
        onOpenOrClosePanel={setIsOpen}
        articleState={articleState}
        onApplySettings={setArticleState}
      />
      <Article />
    </main>
  );
};
