import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Grid, Space } from 'antd';


const { useBreakpoint } = Grid;

const App = () => {
    const { t, i18n } = useTranslation();
    const screens = useBreakpoint();
    const [isGridLayoutSwapped, setIsGridLayoutSwapped] = useState(false);

    const changeLanguage = (lang: string) => {
        i18n.changeLanguage(lang);
    };

    const handleButtonClick = () => {
        setIsGridLayoutSwapped(!isGridLayoutSwapped);
    };

    return (
        <div className="App">

            <div className="one-container">
                <button className="one-button" onClick={handleButtonClick}>
                    <div className="one-triangle"></div>
                    <div className="label">
                        <label htmlFor="">{t('label-button-one')}</label>
                    </div>
                </button>

                <button className="two-button">
                    <div className="two-triangle"></div>
                    <div className="three-triangle"></div>
                    <div className="label">
                        <label htmlFor="">{t('label-button-two')}</label>
                    </div>
                </button>

                <button className="one-button" onClick={handleButtonClick}>
                    <div className="four-triangle"></div>
                    <div className="label">
                        <label htmlFor="">{t('label-button-one')}</label>
                    </div>
                </button>
            </div>

            <hr />
            <div className="two-container">
                <Space direction={screens.xl ? 'vertical' : 'horizontal'}
                    size={[16, 16]}
                    wrap>
                    <div className="container">
                        <div className={`box-1 ${isGridLayoutSwapped ? 'grid-swapped' : ''}`}>
                            <button className={`one-box ${isGridLayoutSwapped ? 'box-swapped' : ''}`}>
                                <div className="square"></div>
                            </button>
                            <button className={`two-box ${isGridLayoutSwapped ? 'box-swapped' : ''}`}>
                                <div className="circle"></div>
                            </button>
                            <button className={`three-box ${isGridLayoutSwapped ? 'box-swapped' : ''}`}>
                                <div className="ellipse"></div>
                            </button>
                        </div>

                        <div className="box-2">
                            <button className={`four-box ${isGridLayoutSwapped ? 'box-swapped' : ''}`}>
                                <div className="trapezoid"></div>
                            </button>
                            <button className={`five-box ${isGridLayoutSwapped ? 'box-swapped' : ''}`}>
                                <div className="rectangle"></div>
                            </button>
                            <button className={`six-box ${isGridLayoutSwapped ? 'box-swapped' : ''}`}>
                                <div className="parallelogram"></div>
                            </button>
                        </div>
                    </div>
                </Space>
            </div>


            {/* <div className={`two-container ${isGridLayoutSwapped ? 'grid-swapped' : ''}`}>
                <Space
                    direction={screens.xs ? 'vertical' : 'horizontal'}
                    size={[16, 16]}
                    wrap
                    className={`container ${isGridLayoutSwapped ? 'grid-swapped' : ''}`}
                >
                    <button className={`one-box ${isGridLayoutSwapped ? 'box-swapped' : ''}`}>
                        <div className="square"></div>
                    </button>
                    <button className={`two-box ${isGridLayoutSwapped ? 'box-swapped' : ''}`}>
                        <div className="circle"></div>
                    </button>
                    <button className={`three-box ${isGridLayoutSwapped ? 'box-swapped' : ''}`}>
                        <div className="ellipse"></div>
                    </button>
                    <button className={`four-box ${isGridLayoutSwapped ? 'box-swapped' : ''}`}>
                        <div className="trapezoid"></div>
                    </button>
                    <button className={`five-box ${isGridLayoutSwapped ? 'box-swapped' : ''}`}>
                        <div className="rectangle"></div>
                    </button>
                    <button className={`six-box ${isGridLayoutSwapped ? 'box-swapped' : ''}`}>
                        <div className="parallelogram"></div>
                    </button>
                </Space>
            </div> */}

        </div>
    );
};

export default App;
