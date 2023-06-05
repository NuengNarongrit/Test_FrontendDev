import { useTranslation } from 'react-i18next';
import { Select } from 'antd';

const { Option } = Select;
const Head = () => {
    const { t, i18n } = useTranslation();

    const changeLanguage = (lang: string) => {
        i18n.changeLanguage(lang);
    };
    return (
        <>
            <header className="App-header">
                <h2>{t('greeting')}</h2>
                <Select className="custom-select" defaultValue="en" onChange={changeLanguage}>
                    <Option value="en">{t('en')}</Option>
                    <Option value="th">{t('th')}</Option>
                </Select>
            </header>
        </>
    )
}

export default Head