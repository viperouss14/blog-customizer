import styles from './ArticleParamsForm.module.scss';
import clsx from 'clsx';
import { useState, useRef, useEffect } from 'react';

import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import { Separator } from '../separator';
import { Select } from '../select';
import {
	ArticleStateType,
	fontFamilyOptions,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
} from 'src/constants/articleProps';
import { RadioGroup } from '../radio-group';
import { Text } from 'components/text';

type ArticleParamsFormProps = {
	appState: ArticleStateType;
	setAppState(props: ArticleStateType): void;
};

export const ArticleParamsForm = ({
	appState,
	setAppState,
}: ArticleParamsFormProps) => {
	const toggleSidebar = () => setIsSidebarOpen((isOpen) => !isOpen);

	const [isSidebarOpen, setIsSidebarOpen] = useState(false);
	const [fontFamily, setFontFamily] = useState(appState.fontFamilyOption);
	const [fontSize, setFontSize] = useState(appState.fontSizeOption);
	const [fontColor, setFontColor] = useState(appState.fontColor);
	const [backgroundColor, setBackgroundColor] = useState(
		appState.backgroundColor
	);
	const [contentWidth, setContentWidth] = useState(appState.contentWidth);

	const sidebarRef = useRef<HTMLDivElement>(null);

	const handleResetForm = () => {
		setAppState(defaultArticleState);
		setFontFamily(defaultArticleState.fontFamilyOption);
		setFontSize(defaultArticleState.fontSizeOption);
		setFontColor(defaultArticleState.fontColor);
		setBackgroundColor(defaultArticleState.backgroundColor);
		setContentWidth(defaultArticleState.contentWidth);
	};

	const handleSubmitForm = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		setAppState({
			...appState,
			fontFamilyOption: fontFamily,
			fontSizeOption: fontSize,
			fontColor: fontColor,
			backgroundColor: backgroundColor,
			contentWidth: contentWidth,
		});
	};

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				sidebarRef.current &&
				!sidebarRef.current.contains(event.target as Node)
			) {
				setIsSidebarOpen(false);
			}
		};

		if (!isSidebarOpen) return;

		window.addEventListener('mousedown', handleClickOutside);

		return () => {
			window.removeEventListener('mousedown', handleClickOutside);
		};
	}, [isSidebarOpen]);

	return (
		<div ref={sidebarRef}>
			<ArrowButton onClick={toggleSidebar} isOpen={isSidebarOpen} />
			<aside
				className={clsx(styles.container, {
					[styles.container_open]: isSidebarOpen,
				})}>
				<form
					className={styles.form}
					onReset={handleResetForm}
					onSubmit={handleSubmitForm}>
					<Text as='h2' size={31} weight={800} uppercase>
						задайте параметры
					</Text>
					<Select
						title={'шрифт'}
						options={fontFamilyOptions}
						selected={fontFamily}
						onChange={setFontFamily}
					/>
					<RadioGroup
						title={'размер шрифта'}
						name={'размер шрифта'}
						options={fontSizeOptions}
						selected={fontSize}
						onChange={setFontSize}
					/>
					<Select
						title={'цвет шрифта'}
						options={fontColors}
						selected={fontColor}
						onChange={setFontColor}
					/>
					<Separator />
					<Select
						title={'цвет фона'}
						options={backgroundColors}
						selected={backgroundColor}
						onChange={setBackgroundColor}
					/>
					<Select
						title={'ширина контента'}
						options={contentWidthArr}
						selected={contentWidth}
						onChange={setContentWidth}
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</div>
	);
};
