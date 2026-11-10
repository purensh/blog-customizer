import { clsx } from 'clsx';
import { useRef, useState } from 'react';
import {
  backgroundColors,
  contentWidthArr,
  defaultArticleState,
  fontColors,
  fontFamilyOptions,
  fontSizeOptions,
} from 'src/constants/articleProps';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { RadioGroup } from 'src/ui/radio-group';
import { Select } from 'src/ui/select';
import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose';
import { Separator } from 'src/ui/separator';
import { Text } from 'src/ui/text';

import type { ArticleStateType, OptionType } from 'src/constants/articleProps';

import styles from './ArticleParamsForm.module.scss';

type ArticleParamsFormProps = {
  articleState: ArticleStateType;
  onApplySettings: (state: ArticleStateType) => void;
};

export const ArticleParamsForm = ({
  articleState,
  onApplySettings,
}: ArticleParamsFormProps): React.JSX.Element => {
  const [formState, setFormState] = useState<ArticleStateType>(articleState);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useOutsideClickClose({
    isOpen: isFormOpen,
    rootRef,
    onChange: setIsFormOpen,
  });

  const handleFieldChange =
    (field: keyof ArticleStateType) =>
    (option: OptionType): void => {
      setFormState((prevState) => ({ ...prevState, [field]: option }));
    };

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    onApplySettings(formState);
  };

  const handleFormReset = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    setFormState(defaultArticleState);
    onApplySettings(defaultArticleState);
  };

  return (
    <div ref={rootRef}>
      <ArrowButton isOpen={isFormOpen} onClick={() => setIsFormOpen(!isFormOpen)} />
      <aside
        className={clsx(styles.container, {
          [styles.container_open]: isFormOpen,
        })}
      >
        <form
          className={styles.form}
          onSubmit={handleFormSubmit}
          onReset={handleFormReset}
        >
          <Text as="h2" size={31} weight={800} uppercase>
            Задайте параметры
          </Text>
          <div className={styles.fields}>
            <Select
              title="Шрифт"
              selected={formState.fontFamilyOption}
              options={fontFamilyOptions}
              onChange={handleFieldChange('fontFamilyOption')}
            />
            <RadioGroup
              title="Размер шрифта"
              name="font-size"
              selected={formState.fontSizeOption}
              options={fontSizeOptions}
              onChange={handleFieldChange('fontSizeOption')}
            />
            <Select
              title="Цвет шрифта"
              selected={formState.fontColor}
              options={fontColors}
              onChange={handleFieldChange('fontColor')}
            />
            <Separator />
            <Select
              title="Цвет фона"
              selected={formState.backgroundColor}
              options={backgroundColors}
              onChange={handleFieldChange('backgroundColor')}
            />
            <Select
              title="Ширина контента"
              selected={formState.contentWidth}
              options={contentWidthArr}
              onChange={handleFieldChange('contentWidth')}
            />
          </div>
          <div className={styles.bottom}>
            <div className={styles.bottomContainer}>
              <Button title="Сбросить" htmlType="reset" type="clear" />
              <Button title="Применить" htmlType="submit" type="apply" />
            </div>
          </div>
        </form>
      </aside>
    </div>
  );
};
