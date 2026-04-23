import { useState, useRef, useEffect } from 'react'
import './App.css'

const flagCountries = [
  { question: 'Молдова или Румыния?',          codeA: 'MD', nameA: 'Молдова',          codeB: 'RO', nameB: 'Румыния' },
  { question: 'Румыния или Чад?',               codeA: 'RO', nameA: 'Румыния',           codeB: 'TD', nameB: 'Чад' },
  { question: 'ДР Конго или Респ. Конго?',      codeA: 'CD', nameA: 'ДР Конго',          codeB: 'CG', nameB: 'Респ. Конго' },
  { question: 'Кения или Танзания?',            codeA: 'KE', nameA: 'Кения',             codeB: 'TZ', nameB: 'Танзания' },
  { question: 'Танзания или Уганда?',           codeA: 'TZ', nameA: 'Танзания',          codeB: 'UG', nameB: 'Уганда' },
  { question: 'Уганда или Кения?',              codeA: 'UG', nameA: 'Уганда',            codeB: 'KE', nameB: 'Кения' },
  { question: 'Сомали или Джибути?',            codeA: 'SO', nameA: 'Сомали',            codeB: 'DJ', nameB: 'Джибути' },
  { question: 'Джибути или Эритрея?',           codeA: 'DJ', nameA: 'Джибути',           codeB: 'ER', nameB: 'Эритрея' },
  { question: 'Эритрея или Эфиопия?',           codeA: 'ER', nameA: 'Эритрея',           codeB: 'ET', nameB: 'Эфиопия' },
  { question: 'Эфиопия или Судан?',             codeA: 'ET', nameA: 'Эфиопия',           codeB: 'SD', nameB: 'Судан' },
  { question: 'Судан или Южный Судан?',         codeA: 'SD', nameA: 'Судан',             codeB: 'SS', nameB: 'Южный Судан' },
  { question: 'Южный Судан или Египет?',        codeA: 'SS', nameA: 'Южный Судан',       codeB: 'EG', nameB: 'Египет' },
  { question: 'Египет или Ливия?',              codeA: 'EG', nameA: 'Египет',            codeB: 'LY', nameB: 'Ливия' },
  { question: 'Ливия или Тунис?',               codeA: 'LY', nameA: 'Ливия',             codeB: 'TN', nameB: 'Тунис' },
  { question: 'Тунис или Алжир?',               codeA: 'TN', nameA: 'Тунис',             codeB: 'DZ', nameB: 'Алжир' },
  { question: 'Алжир или Марокко?',             codeA: 'DZ', nameA: 'Алжир',             codeB: 'MA', nameB: 'Марокко' },
  { question: 'Марокко или Саудовская Аравия?', codeA: 'MA', nameA: 'Марокко',           codeB: 'SA', nameB: 'Саудовская Аравия' },
  { question: 'Саудовская Аравия или ОАЭ?',     codeA: 'SA', nameA: 'Саудовская Аравия', codeB: 'AE', nameB: 'ОАЭ' },
  { question: 'ОАЭ или Катар?',                 codeA: 'AE', nameA: 'ОАЭ',               codeB: 'QA', nameB: 'Катар' },
  { question: 'Катар или Бахрейн?',             codeA: 'QA', nameA: 'Катар',             codeB: 'BH', nameB: 'Бахрейн' },
  { question: 'Бахрейн или Кувейт?',            codeA: 'BH', nameA: 'Бахрейн',           codeB: 'KW', nameB: 'Кувейт' },
  { question: 'Кувейт или Ирак?',               codeA: 'KW', nameA: 'Кувейт',            codeB: 'IQ', nameB: 'Ирак' },
  { question: 'Ирак или Иран?',                 codeA: 'IQ', nameA: 'Ирак',              codeB: 'IR', nameB: 'Иран' },
  { question: 'Иран или Турция?',               codeA: 'IR', nameA: 'Иран',              codeB: 'TR', nameB: 'Турция' },
  { question: 'Турция или Азербайджан?',        codeA: 'TR', nameA: 'Турция',            codeB: 'AZ', nameB: 'Азербайджан' },
  { question: 'Азербайджан или Казахстан?',     codeA: 'AZ', nameA: 'Азербайджан',       codeB: 'KZ', nameB: 'Казахстан' },
  { question: 'Казахстан или Узбекистан?',      codeA: 'KZ', nameA: 'Казахстан',         codeB: 'UZ', nameB: 'Узбекистан' },
  { question: 'Узбекистан или Туркменистан?',   codeA: 'UZ', nameA: 'Узбекистан',        codeB: 'TM', nameB: 'Туркменистан' },
  { question: 'Туркменистан или Кыргызстан?',   codeA: 'TM', nameA: 'Туркменистан',      codeB: 'KG', nameB: 'Кыргызстан' },
  { question: 'Кыргызстан или Таджикистан?',    codeA: 'KG', nameA: 'Кыргызстан',        codeB: 'TJ', nameB: 'Таджикистан' },
]

const moscowCountries = [
  { n: 'Зимбабве',   r: 'Южная Африка',         pop: 16.3, big: true,  code: 'ZW' },
  { n: 'Эквадор',    r: 'Южная Америка',         pop: 18.4, big: true,  code: 'EC' },
  { n: 'Гватемала',  r: 'Центральная Америка',   pop: 17.6, big: true,  code: 'GT' },
  { n: 'Камбоджа',   r: 'Юго-Восточная Азия',    pop: 17.3, big: true,  code: 'KH' },
  { n: 'Чили',       r: 'Южная Америка',         pop: 19.6, big: true,  code: 'CL' },
  { n: 'Казахстан',  r: 'Центральная Азия',      pop: 19.9, big: true,  code: 'KZ' },
  { n: 'Нидерланды', r: 'Западная Европа',       pop: 17.9, big: true,  code: 'NL' },
  { n: 'Австралия',  r: 'Океания',               pop: 26.5, big: true,  code: 'AU' },
  { n: 'Руанда',     r: 'Центральная Африка',    pop: 14.2, big: true,  code: 'RW' },
  { n: 'Греция',     r: 'Южная Европа',          pop: 10.4, big: false, code: 'GR' },
  { n: 'Бельгия',    r: 'Западная Европа',       pop: 11.7, big: false, code: 'BE' },
  { n: 'Португалия', r: 'Южная Европа',          pop: 10.3, big: false, code: 'PT' },
  { n: 'Швеция',     r: 'Северная Европа',       pop: 10.6, big: false, code: 'SE' },
  { n: 'ОАЭ',        r: 'Аравийский полуостров', pop: 9.9,  big: false, code: 'AE' },
  { n: 'Куба',       r: 'Карибский бассейн',     pop: 11.1, big: false, code: 'CU' },
  { n: 'Венгрия',    r: 'Центральная Европа',    pop: 9.7,  big: false, code: 'HU' },
  { n: 'Израиль',    r: 'Ближний Восток',        pop: 9.4,  big: false, code: 'IL' },
  { n: 'Швейцария',  r: 'Западная Европа',       pop: 8.8,  big: false, code: 'CH' },
  { n: 'Боливия',    r: 'Южная Америка',         pop: 12.3, big: false, code: 'BO' },
  { n: 'Тунис',      r: 'Северная Африка',       pop: 12.1, big: false, code: 'TN' },
]

const russianCities = [
  { n: 'Саратов',          r: 'Саратовская область',     pop: 891,  big: true,  lat: 51.5924, lon: 46.0348 },
  { n: 'Тюмень',           r: 'Тюменская область',       pop: 855,  big: true,  lat: 57.1522, lon: 65.5272 },
  { n: 'Тольятти',         r: 'Самарская область',       pop: 674,  big: true,  lat: 53.5303, lon: 49.3461 },
  { n: 'Барнаул',          r: 'Алтайский край',          pop: 623,  big: true,  lat: 53.3548, lon: 83.7698 },
  { n: 'Ижевск',           r: 'Удмуртская Республика',  pop: 620,  big: true,  lat: 56.8526, lon: 53.2045 },
  { n: 'Хабаровск',        r: 'Хабаровский край',        pop: 617,  big: true,  lat: 48.4827, lon: 135.0840 },
  { n: 'Ульяновск',        r: 'Ульяновская область',     pop: 613,  big: true,  lat: 54.3282, lon: 48.3866 },
  { n: 'Иркутск',          r: 'Иркутская область',       pop: 611,  big: true,  lat: 52.2978, lon: 104.2964 },
  { n: 'Владивосток',      r: 'Приморский край',         pop: 597,  big: true,  lat: 43.1155, lon: 131.8855 },
  { n: 'Ярославль',        r: 'Ярославская область',     pop: 570,  big: true,  lat: 57.6261, lon: 39.8845 },
  { n: 'Томск',            r: 'Томская область',         pop: 551,  big: true,  lat: 56.4977, lon: 84.9744 },
  { n: 'Кемерово',         r: 'Кемеровская область',     pop: 549,  big: true,  lat: 55.3333, lon: 86.0833 },
  { n: 'Набережные Челны', r: 'Республика Татарстан',    pop: 545,  big: true,  lat: 55.7435, lon: 52.3958 },
  { n: 'Оренбург',         r: 'Оренбургская область',    pop: 539,  big: true,  lat: 51.7727, lon: 55.0988 },
  { n: 'Новокузнецк',      r: 'Кемеровская область',     pop: 533,  big: true,  lat: 53.7557, lon: 87.1099 },
  { n: 'Рязань',           r: 'Рязанская область',       pop: 523,  big: true,  lat: 54.6095, lon: 39.7131 },
  { n: 'Краснодар',        r: 'Краснодарский край',      pop: 1121, big: true,  lat: 45.0355, lon: 38.9753 },
  { n: 'Чебоксары',        r: 'Чувашская Республика',    pop: 496,  big: false, lat: 56.1439, lon: 47.2489 },
  { n: 'Пенза',            r: 'Пензенская область',      pop: 492,  big: false, lat: 53.1959, lon: 45.0183 },
  { n: 'Липецк',           r: 'Липецкая область',        pop: 490,  big: false, lat: 52.6031, lon: 39.5708 },
  { n: 'Калининград',      r: 'Калининградская область', pop: 489,  big: false, lat: 54.7065, lon: 20.5110 },
  { n: 'Астрахань',        r: 'Астраханская область',    pop: 468,  big: false, lat: 46.3497, lon: 48.0408 },
  { n: 'Тула',             r: 'Тульская область',        pop: 466,  big: false, lat: 54.1931, lon: 37.6173 },
  { n: 'Сочи',             r: 'Краснодарский край',      pop: 446,  big: false, lat: 43.5992, lon: 39.7257 },
  { n: 'Улан-Удэ',         r: 'Республика Бурятия',      pop: 436,  big: false, lat: 51.8335, lon: 107.5845 },
  { n: 'Курск',            r: 'Курская область',         pop: 434,  big: false, lat: 51.7304, lon: 36.1927 },
  { n: 'Тверь',            r: 'Тверская область',        pop: 414,  big: false, lat: 56.8587, lon: 35.9176 },
  { n: 'Магнитогорск',     r: 'Челябинская область',     pop: 409,  big: false, lat: 53.4069, lon: 58.9806 },
  { n: 'Сургут',           r: 'Ханты-Мансийский АО',     pop: 406,  big: false, lat: 61.2540, lon: 73.3964 },
  { n: 'Белгород',         r: 'Белгородская область',    pop: 393,  big: false, lat: 50.5997, lon: 36.5858 },
]

const britainCountries = [
  { n: 'Индия',             r: 'Южная Азия',              invaded: true,  fact: 'Британская Ост-Индская компания с 1600 г.',   code: 'IN' },
  { n: 'Австралия',         r: 'Океания',                 invaded: true,  fact: 'Колония с 1788, доминион с 1901 г.',          code: 'AU' },
  { n: 'США',               r: 'Северная Америка',        invaded: true,  fact: '13 колоний, война за независимость 1775 г.',  code: 'US' },
  { n: 'Китай',             r: 'Восточная Азия',          invaded: true,  fact: 'Опиумные войны 1839 и 1856 гг.',              code: 'CN' },
  { n: 'Россия',            r: 'Евразия',                 invaded: true,  fact: 'Крымская война 1853, интервенция 1918 г.',    code: 'RU' },
  { n: 'Иран',              r: 'Ближний Восток',          invaded: true,  fact: 'Оккупация совместно с СССР в 1941 г.',        code: 'IR' },
  { n: 'Афганистан',        r: 'Центральная Азия',        invaded: true,  fact: 'Три англо-афганские войны 1839–1919 гг.',     code: 'AF' },
  { n: 'Египет',            r: 'Северная Африка',         invaded: true,  fact: 'Оккупация с 1882, протекторат до 1952 г.',    code: 'EG' },
  { n: 'ЮАР',               r: 'Южная Африка',            invaded: true,  fact: 'Англо-бурские войны 1880 и 1899 гг.',         code: 'ZA' },
  { n: 'Нигерия',           r: 'Западная Африка',         invaded: true,  fact: 'Британская колония, независимость в 1960 г.', code: 'NG' },
  { n: 'Кения',             r: 'Восточная Африка',        invaded: true,  fact: 'Колония с 1895, восстание Мау-Мау 1952 г.',   code: 'KE' },
  { n: 'Индонезия',         r: 'Юго-Восточная Азия',      invaded: true,  fact: 'Захват Явы у Голландии в 1811 г.',            code: 'ID' },
  { n: 'Пакистан',          r: 'Южная Азия',              invaded: true,  fact: 'Часть Британской Индии до 1947 г.',           code: 'PK' },
  { n: 'Ирак',              r: 'Ближний Восток',          invaded: true,  fact: 'Мандат с 1920, вновь оккупирован в 1941 г.', code: 'IQ' },
  { n: 'Аргентина',         r: 'Южная Америка',           invaded: true,  fact: 'Вторжения в Буэнос-Айрес 1806 и 1807 гг.',   code: 'AR' },
  { n: 'Бразилия',          r: 'Южная Америка',           invaded: true,  fact: 'Блокада 1862, захват кораблей',               code: 'BR' },
  { n: 'Япония',            r: 'Восточная Азия',          invaded: true,  fact: 'Бомбардировка Кагосимы 1863 г.',              code: 'JP' },
  { n: 'Канада',            r: 'Северная Америка',        invaded: true,  fact: 'Колония, затем доминион с 1867 г.',           code: 'CA' },
  { n: 'Франция',           r: 'Западная Европа',         invaded: true,  fact: 'Столетняя война, Наполеоновские войны',       code: 'FR' },
  { n: 'Германия',          r: 'Центральная Европа',      invaded: true,  fact: 'Обе мировые войны, оккупация 1945 г.',        code: 'DE' },
  { n: 'Испания',           r: 'Южная Европа',            invaded: true,  fact: 'Гибралтар с 1704, Полуостровная война',       code: 'ES' },
  { n: 'Португалия',        r: 'Южная Европа',            invaded: true,  fact: 'Оккупация Лиссабона в 1807 г.',               code: 'PT' },
  { n: 'Турция',            r: 'Евразия',                 invaded: true,  fact: 'Галлиполи 1915, Константинополь 1918 г.',     code: 'TR' },
  { n: 'Саудовская Аравия', r: 'Аравийский полуостров',   invaded: true,  fact: 'Военные операции 1917–1918 гг.',              code: 'SA' },
  { n: 'Иордания',          r: 'Ближний Восток',          invaded: true,  fact: 'Британский мандат Трансиордания 1921 г.',     code: 'JO' },
  { n: 'Мьянма',            r: 'Юго-Восточная Азия',      invaded: true,  fact: 'Три англо-бирманские войны 1824–1885 гг.',    code: 'MM' },
  { n: 'Зимбабве',          r: 'Южная Африка',            invaded: true,  fact: 'Родезия — колония Сесила Родса с 1890 г.',    code: 'ZW' },
  { n: 'Гана',              r: 'Западная Африка',         invaded: true,  fact: 'Золотой Берег — британская колония',          code: 'GH' },
  { n: 'Эфиопия',           r: 'Восточная Африка',        invaded: true,  fact: 'Абиссинская экспедиция 1868 г.',              code: 'ET' },
  { n: 'Мексика',           r: 'Северная Америка',        invaded: true,  fact: 'Интервенция 1861 г., захват Веракруса',       code: 'MX' },
  { n: 'Швеция',            r: 'Северная Европа',         invaded: false, fact: 'Одна из ~22 стран вне досягаемости',          code: 'SE' },
  { n: 'Беларусь',          r: 'Восточная Европа',        invaded: false, fact: 'Никогда не подвергалась британскому вторжению', code: 'BY' },
  { n: 'Боливия',           r: 'Южная Америка',           invaded: false, fact: 'Единственная крупная страна Латинской Америки', code: 'BO' },
  { n: 'Люксембург',        r: 'Западная Европа',         invaded: false, fact: 'Не тронут, несмотря на центральное положение',  code: 'LU' },
  { n: 'Монголия',          r: 'Центральная Азия',        invaded: false, fact: 'Слишком далеко даже для Империи',             code: 'MN' },
  { n: 'Парагвай',          r: 'Южная Америка',           invaded: false, fact: 'Изолированное положение уберегло страну',     code: 'PY' },
  { n: 'Гватемала',         r: 'Центральная Америка',     invaded: false, fact: 'Несмотря на Белиз рядом — не тронута',        code: 'GT' },
  { n: 'Мали',              r: 'Западная Африка',         invaded: false, fact: 'Французская, а не британская сфера',          code: 'ML' },
  { n: 'Чад',               r: 'Центральная Африка',      invaded: false, fact: 'Французская Экваториальная Африка',           code: 'TD' },
  { n: 'Узбекистан',        r: 'Центральная Азия',        invaded: false, fact: 'Российская, а не британская Средняя Азия',    code: 'UZ' },
]

const capitalsQuiz = [
  { city: 'Париж',           country: 'Франция',       code: 'FR', isCapital: true },
  { city: 'Сидней',          country: 'Австралия',     code: 'AU', isCapital: false, trap: 'Столица — Канберра' },
  { city: 'Берлин',          country: 'Германия',      code: 'DE', isCapital: true },
  { city: 'Нью-Йорк',        country: 'США',           code: 'US', isCapital: false, trap: 'Столица — Вашингтон' },
  { city: 'Токио',           country: 'Япония',        code: 'JP', isCapital: true },
  { city: 'Стамбул',         country: 'Турция',        code: 'TR', isCapital: false, trap: 'Столица — Анкара' },
  { city: 'Анкара',          country: 'Турция',        code: 'TR', isCapital: true },
  { city: 'Рио-де-Жанейро',  country: 'Бразилия',     code: 'BR', isCapital: false, trap: 'Столица — Бразилиа' },
  { city: 'Бразилиа',        country: 'Бразилия',     code: 'BR', isCapital: true },
  { city: 'Дубай',           country: 'ОАЭ',           code: 'AE', isCapital: false, trap: 'Столица — Абу-Даби' },
  { city: 'Каир',            country: 'Египет',        code: 'EG', isCapital: true },
  { city: 'Шанхай',          country: 'Китай',         code: 'CN', isCapital: false, trap: 'Столица — Пекин' },
  { city: 'Пекин',           country: 'Китай',         code: 'CN', isCapital: true },
  { city: 'Милан',           country: 'Италия',        code: 'IT', isCapital: false, trap: 'Столица — Рим' },
  { city: 'Рим',             country: 'Италия',        code: 'IT', isCapital: true },
  { city: 'Цюрих',           country: 'Швейцария',     code: 'CH', isCapital: false, trap: 'Столица — Берн' },
  { city: 'Краков',          country: 'Польша',        code: 'PL', isCapital: false, trap: 'Столица — Варшава' },
  { city: 'Киев',            country: 'Украина',       code: 'UA', isCapital: true },
  { city: 'Нью-Дели',        country: 'Индия',         code: 'IN', isCapital: true },
  { city: 'Тель-Авив',       country: 'Израиль',       code: 'IL', isCapital: false, trap: 'Столица — Иерусалим' },
  { city: 'Сеул',            country: 'Южная Корея',   code: 'KR', isCapital: true },
  { city: 'Канберра',        country: 'Австралия',     code: 'AU', isCapital: true },
  { city: 'Веллингтон',      country: 'Новая Зеландия', code: 'NZ', isCapital: true },
  { city: 'Алматы',          country: 'Казахстан',     code: 'KZ', isCapital: false, trap: 'Столица — Астана' },
  { city: 'Доха',            country: 'Катар',         code: 'QA', isCapital: true },
]

const currencyQuiz = [
  { question: 'Швейцария платит евро?',                country: 'Швейцария',         code: 'CH', isTrue: false, fact: 'Швейцарский франк — отказались от евро' },
  { question: 'Великобритания платит фунтом?',         country: 'Великобритания',    code: 'GB', isTrue: true,  fact: 'Фунт стерлингов — старейшая валюта мира' },
  { question: 'Черногория платит евро?',               country: 'Черногория',        code: 'ME', isTrue: true,  fact: 'Евро — хотя Черногория не в ЕС!' },
  { question: 'Норвегия платит евро?',                 country: 'Норвегия',          code: 'NO', isTrue: false, fact: 'Норвежская крона — не в еврозоне' },
  { question: 'Дания платит евро?',                    country: 'Дания',             code: 'DK', isTrue: false, fact: 'Датская крона — проголосовали против евро' },
  { question: 'Венгрия платит евро?',                  country: 'Венгрия',           code: 'HU', isTrue: false, fact: 'Форинт — в ЕС, но не в еврозоне' },
  { question: 'Польша платит евро?',                   country: 'Польша',            code: 'PL', isTrue: false, fact: 'Злотый — в ЕС, но евро не ввели' },
  { question: 'Косово платит евро?',                   country: 'Косово',            code: 'XK', isTrue: true,  fact: 'Евро — как и Черногория, не член ЕС!' },
  { question: 'Египет платит фунтом?',                 country: 'Египет',            code: 'EG', isTrue: true,  fact: 'Египетский фунт — не путать с британским!' },
  { question: 'Марокко платит дирхамом?',              country: 'Марокко',           code: 'MA', isTrue: true,  fact: 'Марокканский дирхам — не путать с дирхамом ОАЭ!' },
  { question: 'Саудовская Аравия платит динаром?',     country: 'Саудовская Аравия', code: 'SA', isTrue: false, fact: 'Риял — динар это Кувейт, Иордания, Ирак' },
  { question: 'Кувейт платит динаром?',                country: 'Кувейт',            code: 'KW', isTrue: true,  fact: 'Кувейтский динар — самая дорогая валюта мира' },
  { question: 'Иордания платит риялом?',               country: 'Иордания',          code: 'JO', isTrue: false, fact: 'Иорданский динар — риял это Саудовская Аравия' },
  { question: 'Иран платит туманом?',                  country: 'Иран',              code: 'IR', isTrue: false, fact: 'Официально риял — туман народное название' },
  { question: 'Турция платит лирой?',                  country: 'Турция',            code: 'TR', isTrue: true,  fact: 'Лира потеряла 80% стоимости за 5 лет' },
  { question: 'Южная Корея платит иеной?',             country: 'Южная Корея',       code: 'KR', isTrue: false, fact: 'Корейская вона — иена только в Японии' },
  { question: 'Индия платит рупией?',                  country: 'Индия',             code: 'IN', isTrue: true,  fact: 'Рупия используется ещё в 7 странах мира' },
  { question: 'Пакистан платит рупией?',               country: 'Пакистан',          code: 'PK', isTrue: true,  fact: 'Своя рупия — не путать с индийской' },
  { question: 'Бразилия платит песо?',                 country: 'Бразилия',          code: 'BR', isTrue: false, fact: 'Реал — только Бразилия в Латинской Америке' },
  { question: 'Аргентина платит реалом?',              country: 'Аргентина',         code: 'AR', isTrue: false, fact: 'Песо — реал это Бразилия' },
  { question: 'Азербайджан платит манатом?',           country: 'Азербайджан',       code: 'AZ', isTrue: true,  fact: 'Манат — также используется в Туркменистане' },
  { question: 'Армения платит драмом?',                country: 'Армения',           code: 'AM', isTrue: true,  fact: 'Армянский драм — с 1993 года' },
  { question: 'Грузия платит рублём?',                 country: 'Грузия',            code: 'GE', isTrue: false, fact: 'Лари — своя валюта с 1995 года' },
  { question: 'Таджикистан платит сомони?',            country: 'Таджикистан',       code: 'TJ', isTrue: true,  fact: 'Сомони — назван в честь основателя государства' },
  { question: 'Швеция платит евро?',                   country: 'Швеция',            code: 'SE', isTrue: false, fact: 'Крона — в 2023 году окончательно отказались' },
]

const shuffle = a => [...a].sort(() => Math.random() - 0.5)
const fmtPop = p => p >= 1000 ? (p / 1000).toFixed(2).replace(/\.?0+$/, '') + ' млн' : p + ' тыс.'
const flagUrl = code => new URL(`/node_modules/country-flag-icons/3x2/${code}.svg`, import.meta.url).href
const mapUrl = (lat, lon) => `https://www.openstreetmap.org/export/embed.html?bbox=${lon-0.15},${lat-0.1},${lon+0.15},${lat+0.1}&layer=mapnik&marker=${lat},${lon}`

// Единая светлая палитра
const LIGHT = {
  bg: 'linear-gradient(160deg, #e8f4ff 0%, #c8e4f8 50%, #d8eeff 100%)',
  card: 'white',
  cardShadow: '0 8px 40px rgba(60,120,200,0.13)',
  text: '#1a3a6e',
  textSub: '#5a80b0',
  textLight: '#8aaace',
  border: 'rgba(100,160,220,0.18)',
  yes: '#27ae60',
  no: '#e74c3c',
  yesBg: 'rgba(39,174,96,0.10)',
  noBg: 'rgba(231,76,60,0.10)',
  yesBorder: 'rgba(39,174,96,0.3)',
  noBorder: 'rgba(231,76,60,0.3)',
  badge: 'rgba(100,160,220,0.12)',
}

// ═══════════════════════════════════════
// АЙКА SVG
// ═══════════════════════════════════════
function AikaSVG({ state = 'idle', size = 140 }) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const states = ['idle', 'correct', 'wrong', 'thinking', 'dance']
    states.forEach(s => el.classList.remove(s))
    void el.offsetWidth
    el.classList.add(state)
  }, [state])

  return (
    <div ref={ref} className={`aika ${state}`} style={{ position: 'relative', width: size, height: size * 1.3, display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
      <style>{`
        .aika .bear-wrap { position: absolute; bottom: 8px; width: 100%; height: 100%; display: flex; align-items: flex-end; justify-content: center; }
        .aika .bear-wrap svg { width: 100%; height: 100%; filter: drop-shadow(0 6px 16px rgba(0,100,160,0.2)); overflow: visible; }
        .aika.idle .bear-wrap { animation: aikaBob 2.4s ease-in-out infinite; }
        @keyframes aikaBob { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
        .aika.idle #aika-eyes { animation: aikaBlink 4s ease-in-out infinite; }
        @keyframes aikaBlink { 0%,94%,100%{transform:scaleY(1)} 96%{transform:scaleY(0.08)} }
        .aika.idle #aika-globe { animation: aikaGlobe 2.4s ease-in-out infinite; transform-box:fill-box; transform-origin:50% 50%; }
        @keyframes aikaGlobe { 0%,100%{transform:rotate(0deg)} 50%{transform:rotate(4deg)} }
        .aika.correct .bear-wrap { animation: aikaJump 0.8s cubic-bezier(.36,.07,.19,.97) forwards; }
        @keyframes aikaJump { 0%{transform:translateY(0) rotate(0)} 30%{transform:translateY(-36px) rotate(-8deg)} 60%{transform:translateY(-24px) rotate(8deg)} 80%{transform:translateY(-6px) rotate(-2deg)} 100%{transform:translateY(0) rotate(0)} }
        .aika.correct #aika-mouth { animation: aikaSmile 0.8s ease forwards; transform-box:fill-box; transform-origin:50% 50%; }
        @keyframes aikaSmile { 50%{transform:scaleX(1.3) scaleY(1.3)} }
        .aika.wrong .bear-wrap { animation: aikaShake 0.6s cubic-bezier(.36,.07,.19,.97) forwards; }
        @keyframes aikaShake { 0%,100%{transform:translateX(0)} 15%{transform:translateX(-14px) rotate(-4deg)} 30%{transform:translateX(14px) rotate(4deg)} 45%{transform:translateX(-10px) rotate(-3deg)} 60%{transform:translateX(10px) rotate(3deg)} 75%{transform:translateX(-5px)} }
        .aika.wrong #aika-eyes { animation: aikaSad 1.2s ease forwards; transform-box:fill-box; transform-origin:50% 50%; }
        @keyframes aikaSad { 30%{transform:scaleY(0.4) translateY(2px)} }
        .aika.thinking .bear-wrap { animation: aikaTilt 1.6s ease-in-out infinite; }
        @keyframes aikaTilt { 0%,100%{transform:rotate(0)} 35%{transform:rotate(-8deg)} 70%{transform:rotate(5deg)} }
        .aika.dance .bear-wrap { animation: aikaDance 0.5s ease-in-out infinite alternate; }
        @keyframes aikaDance { 0%{transform:translateY(0) rotate(-6deg) scaleX(1)} 100%{transform:translateY(-12px) rotate(6deg) scaleX(1.05)} }
        .star-burst { position:absolute; top:0; left:0; width:100%; height:100%; pointer-events:none; }
        .star-burst span { position:absolute; font-size:1.2rem; opacity:0; }
        .aika.correct .star-burst span { animation: starPop 1s ease forwards; }
        .star-burst span:nth-child(1){top:5%;left:10%;animation-delay:.05s}
        .star-burst span:nth-child(2){top:0%;left:50%;animation-delay:.1s}
        .star-burst span:nth-child(3){top:10%;left:80%;animation-delay:.0s}
        .star-burst span:nth-child(4){top:35%;left:0%;animation-delay:.15s}
        .star-burst span:nth-child(5){top:35%;left:88%;animation-delay:.2s}
        @keyframes starPop { 0%{opacity:0;transform:scale(0) rotate(0)} 40%{opacity:1;transform:scale(1.4) rotate(20deg)} 100%{opacity:0;transform:scale(0.8) rotate(40deg) translateY(-18px)} }
        .aika.dance .star-burst span { animation: starPop 0.8s ease infinite; }
      `}</style>
      <div className="star-burst">
        <span>⭐</span><span>✨</span><span>🌟</span><span>⭐</span><span>✨</span>
      </div>
      <div className="bear-wrap">
        <svg viewBox="0 0 220 280" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="furGrad2" cx="40%" cy="35%">
              <stop offset="0%" stopColor="#ffffff"/>
              <stop offset="100%" stopColor="#eef2f7"/>
            </radialGradient>
            <clipPath id="globeClip2"><circle cx="118" cy="210" r="28"/></clipPath>
          </defs>
          <g id="backpack">
            <rect x="42" y="132" width="58" height="75" rx="10" fill="#b07d4a"/>
            <rect x="46" y="136" width="50" height="67" rx="8" fill="#c89358"/>
            <path d="M52 132 Q47 112 57 107" stroke="#8b5e2a" strokeWidth="5" fill="none" strokeLinecap="round"/>
            <path d="M84 132 Q89 112 79 107" stroke="#8b5e2a" strokeWidth="5" fill="none" strokeLinecap="round"/>
            <rect x="62" y="193" width="16" height="9" rx="4" fill="#8b5e2a"/>
            <rect x="50" y="147" width="20" height="13" rx="2" fill="#fff"/>
            <rect x="50" y="147" width="5" height="13" rx="2" fill="#d00"/>
            <rect x="65" y="147" width="5" height="13" rx="2" fill="#d00"/>
            <text x="60" y="157" textAnchor="middle" fontSize="7" fill="#d00">🍁</text>
            <rect x="50" y="164" width="20" height="13" rx="2" fill="#e8f4fd"/>
            <polygon points="60,166 54,176 66,176" fill="white"/>
            <polygon points="60,166 56,172 64,172" fill="#4a9fd4"/>
            <rect x="73" y="163" width="15" height="15" rx="2" fill="#f0e6d3"/>
            <text x="80" y="174" textAnchor="middle" fontSize="10">🗼</text>
            <rect x="73" y="146" width="20" height="13" rx="2" fill="white" stroke="#ddd" strokeWidth="0.5"/>
            <circle cx="83" cy="152" r="4" fill="#d00"/>
          </g>
          <ellipse cx="118" cy="188" rx="56" ry="62" fill="white"/>
          <ellipse cx="118" cy="188" rx="52" ry="58" fill="url(#furGrad2)"/>
          <g id="scarf">
            <path d="M74 162 Q118 150 162 162 Q162 180 118 182 Q74 180 74 162Z" fill="#3b82f6"/>
            <text x="113" y="174" textAnchor="middle" fontSize="13" fontFamily="Nunito,sans-serif" fontWeight="900" fill="white">Aika</text>
            <circle cx="150" cy="177" r="6" fill="#2563eb"/>
            <circle cx="146" cy="172" r="3" fill="#2563eb"/>
            <circle cx="150" cy="171" r="3" fill="#2563eb"/>
            <circle cx="154" cy="172" r="3" fill="#2563eb"/>
          </g>
          <path d="M74 190 Q58 195 55 215 Q58 225 72 222 Q80 220 84 210Z" fill="white"/>
          <path d="M74 190 Q60 196 57 214 Q60 222 72 220 Q79 218 83 209Z" fill="url(#furGrad2)"/>
          <path d="M162 190 Q178 195 181 215 Q178 225 164 222 Q156 220 152 210Z" fill="white"/>
          <path d="M162 190 Q176 196 179 214 Q176 222 164 220 Q157 218 153 209Z" fill="url(#furGrad2)"/>
          <g id="aika-globe">
            <circle cx="118" cy="210" r="28" fill="#3b9ddd"/>
            <ellipse cx="118" cy="210" rx="28" ry="10" fill="none" stroke="#2980b9" strokeWidth="1" opacity=".4"/>
            <ellipse cx="118" cy="210" rx="28" ry="19" fill="none" stroke="#2980b9" strokeWidth="1" opacity=".3"/>
            <ellipse cx="118" cy="210" rx="12" ry="28" fill="none" stroke="#2980b9" strokeWidth="1" opacity=".4"/>
            <g clipPath="url(#globeClip2)">
              <path d="M105 196 Q112 191 120 194 Q126 198 122 205 Q115 209 108 204Z" fill="#4ade80"/>
              <path d="M120 206 Q128 203 133 208 Q131 216 124 218 Q117 216 120 210Z" fill="#4ade80"/>
              <path d="M98 210 Q103 205 107 210 Q105 218 100 216Z" fill="#4ade80"/>
              <path d="M126 194 Q133 191 136 197 Q134 203 128 201Z" fill="#4ade80"/>
              <path d="M107 218 Q114 215 118 220 Q115 226 109 224Z" fill="#4ade80"/>
            </g>
            <circle cx="118" cy="210" r="28" fill="none" stroke="#1d6fa0" strokeWidth="2"/>
            <ellipse cx="108" cy="200" rx="6" ry="4" fill="white" opacity=".25" transform="rotate(-20,108,200)"/>
          </g>
          <ellipse cx="78" cy="218" rx="14" ry="10" fill="white" transform="rotate(20,78,218)"/>
          <ellipse cx="78" cy="218" rx="11" ry="8" fill="url(#furGrad2)" transform="rotate(20,78,218)"/>
          <circle cx="71" cy="212" r="3.5" fill="#eef2f7"/>
          <circle cx="76" cy="209" r="3.5" fill="#eef2f7"/>
          <circle cx="82" cy="209" r="3.5" fill="#eef2f7"/>
          <ellipse cx="158" cy="218" rx="14" ry="10" fill="white" transform="rotate(-20,158,218)"/>
          <ellipse cx="158" cy="218" rx="11" ry="8" fill="url(#furGrad2)" transform="rotate(-20,158,218)"/>
          <circle cx="151" cy="212" r="3.5" fill="#eef2f7"/>
          <circle cx="157" cy="209" r="3.5" fill="#eef2f7"/>
          <circle cx="163" cy="209" r="3.5" fill="#eef2f7"/>
          <ellipse cx="102" cy="250" rx="19" ry="11" fill="white"/>
          <ellipse cx="134" cy="250" rx="19" ry="11" fill="white"/>
          <circle cx="118" cy="108" r="70" fill="white"/>
          <circle cx="118" cy="108" r="66" fill="url(#furGrad2)"/>
          <circle cx="68" cy="56" r="25" fill="white"/>
          <circle cx="68" cy="56" r="17" fill="#e0e0e0"/>
          <circle cx="168" cy="56" r="25" fill="white"/>
          <circle cx="168" cy="56" r="17" fill="#e0e0e0"/>
          <g id="bow" transform="translate(68, 34)">
            <path d="M-20 0 Q-10 -12 0 0 Q-10 12 -20 0Z" fill="#f472b6"/>
            <path d="M0 0 Q10 -12 20 0 Q10 12 0 0Z" fill="#ec4899"/>
            <circle cx="0" cy="0" r="5.5" fill="#f9a8d4"/>
            <ellipse cx="0" cy="0" rx="4" ry="3" fill="#f472b6"/>
            <animateTransform attributeName="transform" type="rotate" values="0 0 0; 7 0 0; 0 0 0; -5 0 0; 0 0 0" keyTimes="0; 0.3; 0.5; 0.75; 1" dur="2.4s" repeatCount="indefinite" additive="sum"/>
          </g>
          <ellipse cx="86" cy="126" rx="15" ry="9" fill="#fca5a5" opacity=".45"/>
          <ellipse cx="150" cy="126" rx="15" ry="9" fill="#fca5a5" opacity=".45"/>
          <g id="aika-eyes">
            <circle cx="95" cy="106" r="17" fill="white"/>
            <circle cx="95" cy="106" r="13" fill="#1e40af"/>
            <circle cx="95" cy="106" r="8" fill="#1a2050"/>
            <circle cx="99" cy="101" r="4" fill="white"/>
            <circle cx="91" cy="112" r="2" fill="white" opacity=".6"/>
            <line x1="84" y1="94" x2="80" y2="87" stroke="#111" strokeWidth="2.5" strokeLinecap="round"/>
            <line x1="92" y1="90" x2="90" y2="82" stroke="#111" strokeWidth="2.5" strokeLinecap="round"/>
            <line x1="100" y1="90" x2="100" y2="82" stroke="#111" strokeWidth="2.5" strokeLinecap="round"/>
            <circle cx="141" cy="106" r="17" fill="white"/>
            <circle cx="141" cy="106" r="13" fill="#1e40af"/>
            <circle cx="141" cy="106" r="8" fill="#1a2050"/>
            <circle cx="145" cy="101" r="4" fill="white"/>
            <circle cx="137" cy="112" r="2" fill="white" opacity=".6"/>
            <line x1="130" y1="94" x2="126" y2="87" stroke="#111" strokeWidth="2.5" strokeLinecap="round"/>
            <line x1="138" y1="90" x2="136" y2="82" stroke="#111" strokeWidth="2.5" strokeLinecap="round"/>
            <line x1="146" y1="90" x2="146" y2="82" stroke="#111" strokeWidth="2.5" strokeLinecap="round"/>
          </g>
          <ellipse cx="118" cy="126" rx="9" ry="6.5" fill="#1a1a2e"/>
          <ellipse cx="115" cy="123" rx="3" ry="2" fill="white" opacity=".4"/>
          <g id="aika-mouth">
            <path d="M102 138 Q118 154 134 138" stroke="#1a1a2e" strokeWidth="3" fill="none" strokeLinecap="round"/>
          </g>
        </svg>
      </div>
    </div>
  )
}

const aikaMessages = {
  correct: ['Молодец! 🎉', 'Так держать! ⭐', 'Ты крутой! 🔥', 'Отлично! 💪', 'Правильно! 🎯'],
  wrong:   ['Не беда! 💙', 'Учимся вместе! 📚', 'В следующий раз! 🌟', 'Почти! 🐾'],
  idle:    ['Привет! Я Айка! 🌍', 'Поехали учиться! 🎒', 'Готова? Начнём! ⭐', 'Свайпай и учись! 🐾'],
}

function useAika() {
  const [state, setState] = useState('idle')
  const [msg, setMsg] = useState('Привет! Я Айка! 🌍')
  const react = (type) => {
    const msgs = aikaMessages[type] || aikaMessages.idle
    setMsg(msgs[Math.floor(Math.random() * msgs.length)])
    setState(type)
    if (type === 'correct' || type === 'wrong') setTimeout(() => setState('idle'), 1800)
  }
  return { state, msg, react }
}

function AikaBubble({ state, msg, size = 100 }) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: '10px', marginBottom: '10px' }}>
      <AikaSVG state={state} size={size} />
      {msg && (
        <div style={{ background: 'white', borderRadius: '18px 18px 18px 4px', padding: '10px 16px', color: LIGHT.text, fontSize: '0.9rem', fontWeight: '700', boxShadow: '0 4px 20px rgba(60,120,200,0.13)', maxWidth: '170px', lineHeight: 1.4, marginBottom: '18px', border: `1px solid ${LIGHT.border}` }}>
          {msg}
        </div>
      )}
    </div>
  )
}

// ═══════════════════════════════════════
// СВАЙП-КАРТОЧКА
// ═══════════════════════════════════════
function SwipeCard({ children, onSwipeLeft, onSwipeRight, offsetX, setOffsetX, dragging, setDragging, startX, style, stampYes, stampNo }) {
  const rotation = offsetX / 14
  const isRight = offsetX > 50
  const isLeft = offsetX < -50
  const onMouseDown = (e) => { startX.current = e.clientX; setDragging(true) }
  const onMouseMove = (e) => { if (!dragging) return; setOffsetX(e.clientX - startX.current) }
  const onMouseUp = () => {
    if (!dragging) return
    setDragging(false)
    if (offsetX > 80) onSwipeRight()
    else if (offsetX < -80) onSwipeLeft()
    else setOffsetX(0)
  }
  const onTouchStart = (e) => { startX.current = e.touches[0].clientX; setDragging(true) }
  const onTouchMove = (e) => { if (!dragging) return; setOffsetX(e.touches[0].clientX - startX.current) }
  return (
    <div onMouseDown={onMouseDown} onMouseMove={onMouseMove} onMouseUp={onMouseUp} onMouseLeave={onMouseUp} onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onMouseUp}
      style={{ position: 'absolute', cursor: dragging ? 'grabbing' : 'grab', transform: `translateX(${offsetX}px) rotate(${rotation}deg)`, transition: dragging ? 'none' : 'transform 0.35s ease', zIndex: 1, ...style }}>
      {isRight && <div style={{ position: 'absolute', top: '20px', right: '16px', color: LIGHT.yes, border: `3px solid ${LIGHT.yes}`, borderRadius: '10px', padding: '5px 12px', fontWeight: 'bold', fontSize: '1rem', transform: 'rotate(-12deg)', zIndex: 10, background: 'rgba(255,255,255,0.9)' }}>{stampYes || 'ДА ✓'}</div>}
      {isLeft && <div style={{ position: 'absolute', top: '20px', left: '16px', color: LIGHT.no, border: `3px solid ${LIGHT.no}`, borderRadius: '10px', padding: '5px 12px', fontWeight: 'bold', fontSize: '1rem', transform: 'rotate(12deg)', zIndex: 10, background: 'rgba(255,255,255,0.9)' }}>{stampNo || 'НЕТ ✗'}</div>}
      {children}
    </div>
  )
}

// ═══════════════════════════════════════
// СЧЁТЧИКИ
// ═══════════════════════════════════════
function ScoreBar({ score, wrong }) {
  return (
    <div style={{ display: 'flex', gap: '28px', marginBottom: '14px' }}>
      {[['#27ae60', score, 'Верно'], ['#e74c3c', wrong, 'Неверно']].map(([color, val, label]) => (
        <div key={label} style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '1.7rem', fontWeight: '800', color }}>{val}</div>
          <div style={{ fontSize: '0.7rem', color: LIGHT.textLight, textTransform: 'uppercase', letterSpacing: '0.8px' }}>{label}</div>
        </div>
      ))}
    </div>
  )
}

// ═══════════════════════════════════════
// КНОПКИ ДА/НЕТ
// ═══════════════════════════════════════
function YesNoButtons({ onNo, onYes }) {
  return (
    <div style={{ marginTop: '18px', display: 'flex', gap: '24px' }}>
      <button onClick={onNo} style={{ width: '68px', height: '68px', borderRadius: '50%', border: `2.5px solid ${LIGHT.no}`, background: LIGHT.noBg, color: LIGHT.no, fontSize: '1.6rem', cursor: 'pointer', fontWeight: '700' }}>✗</button>
      <button onClick={onYes} style={{ width: '68px', height: '68px', borderRadius: '50%', border: `2.5px solid ${LIGHT.yes}`, background: LIGHT.yesBg, color: LIGHT.yes, fontSize: '1.6rem', cursor: 'pointer', fontWeight: '700' }}>✓</button>
    </div>
  )
}

// ═══════════════════════════════════════
// ХЕДЕР РЕЖИМА
// ═══════════════════════════════════════
function ModeHeader({ onBack, title, current, total }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '6px', width: '100%', maxWidth: '375px' }}>
      <button onClick={onBack} style={{ background: 'none', border: 'none', color: LIGHT.textLight, fontSize: '1.6rem', cursor: 'pointer', padding: '4px' }}>←</button>
      <h1 style={{ fontSize: '1.6rem', fontWeight: '900', flex: 1, color: LIGHT.text }}>{title}</h1>
      <span style={{ color: LIGHT.textLight, fontSize: '0.9rem', fontWeight: '600' }}>{current}/{total}</span>
    </div>
  )
}

// ═══════════════════════════════════════
// ЭКРАН РЕЗУЛЬТАТОВ
// ═══════════════════════════════════════
function ResultScreen({ score, total, accentColor, title, children, onRestart, onBack }) {
  return (
    <div style={{ minHeight: '100vh', background: LIGHT.bg, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontFamily: "'Segoe UI', sans-serif", padding: '24px' }}>
      <AikaSVG state="dance" size={150} />
      <h2 style={{ color: LIGHT.text, margin: '8px 0 4px', textAlign: 'center', fontSize: '1.2rem', fontWeight: '800' }}>{title}</h2>
      <div style={{ fontSize: '4rem', fontWeight: '900', color: accentColor, lineHeight: 1.1 }}>{score}<span style={{ fontSize: '1.8rem', color: LIGHT.textLight }}>/{total}</span></div>
      {children}
      <div style={{ display: 'flex', gap: '14px', marginTop: '20px' }}>
        <button onClick={onRestart} style={{ padding: '14px 28px', borderRadius: '50px', border: 'none', background: accentColor, color: 'white', fontSize: '1rem', cursor: 'pointer', fontWeight: '800', boxShadow: `0 4px 20px ${accentColor}55` }}>Заново 🔄</button>
        <button onClick={onBack} style={{ padding: '14px 28px', borderRadius: '50px', border: `2.5px solid ${accentColor}`, background: 'transparent', color: accentColor, fontSize: '1rem', cursor: 'pointer', fontWeight: '700' }}>Меню</button>
      </div>
    </div>
  )
}

// ═══════════════════════════════════════
// ГЛАВНОЕ МЕНЮ
// ═══════════════════════════════════════
function Menu({ onSelect }) {
  const modes = [
    { id: 'flags',    icon: '🏳️', title: 'Угадай флаг',          desc: 'Определи страну по флагу',                count: '30', accent: '#4a6fa5' },
    { id: 'moscow',   icon: '🌍', title: 'Больше, чем Москва?',   desc: 'Сравни население с Москвой',              count: '20', accent: '#2e8b57' },
    { id: 'russia',   icon: '🏙️', title: 'Города России',         desc: 'Больше или меньше 500 тысяч?',           count: '30', accent: '#c0392b' },
    { id: 'britain',  icon: '🇬🇧', title: 'Британия вторгалась?',  desc: 'История Британской империи',             count: '40', accent: '#8b6914' },
    { id: 'capitals', icon: '🏛️', title: 'Это столица?',           desc: 'Угадай — этот город столица страны?',   count: '25', accent: '#1a7a5e' },
    { id: 'currency', icon: '💰', title: 'Валюты мира',            desc: 'Эта страна платит этой валютой?',       count: '25', accent: '#b05a10' },
  ]
  return (
    <div style={{ minHeight: '100vh', background: LIGHT.bg, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontFamily: "'Segoe UI', sans-serif", padding: '24px' }}>
      <AikaSVG state="idle" size={170} />
      <h1 style={{ fontSize: '3rem', fontWeight: '900', color: LIGHT.text, marginBottom: '2px', letterSpacing: '5px', marginTop: '-10px' }}>AIKA</h1>
      <p style={{ color: LIGHT.textLight, marginBottom: '28px', fontSize: '0.82rem', letterSpacing: '2.5px', fontWeight: '600' }}>GEOGRAPHY & HISTORY</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '100%', maxWidth: '375px' }}>
        {modes.map(m => (
          <button key={m.id} onClick={() => onSelect(m.id)} style={{ background: 'white', border: `1.5px solid ${LIGHT.border}`, borderRadius: '18px', padding: '18px 20px', color: LIGHT.text, cursor: 'pointer', textAlign: 'left', boxShadow: LIGHT.cardShadow, transition: 'transform 0.15s' }}
            onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <div style={{ fontSize: '2rem', width: '44px', textAlign: 'center' }}>{m.icon}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '1rem', fontWeight: '800', marginBottom: '3px', color: LIGHT.text }}>{m.title}</div>
                <div style={{ color: LIGHT.textSub, fontSize: '0.8rem' }}>{m.desc}</div>
              </div>
              <div style={{ background: `${m.accent}18`, borderRadius: '20px', padding: '4px 12px', fontSize: '0.75rem', color: m.accent, fontWeight: '700', whiteSpace: 'nowrap' }}>{m.count} карт.</div>
            </div>
          </button>
        ))}
      </div>
      <p style={{ marginTop: '24px', fontSize: '0.8rem', color: LIGHT.textLight }}>Свайпай и учись вместе с Айкой 🐾</p>
    </div>
  )
}

// ═══════════════════════════════════════
// РЕЖИМ — ФЛАГИ
// ═══════════════════════════════════════
function FlagsMode({ onBack }) {
  const [index, setIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [dragging, setDragging] = useState(false)
  const [offsetX, setOffsetX] = useState(0)
  const [animating, setAnimating] = useState(false)
  const startX = useRef(null)
  const { state, msg, react } = useAika()
  const countries = flagCountries
  const current = countries[index]
  const finished = index >= countries.length

  const handleSwipe = (dir) => {
    if (animating) return
    setAnimating(true)
    if (dir === 'right') { setScore(s => s + 1); react('correct') } else { react('wrong') }
    setOffsetX(dir === 'right' ? 700 : -700)
    setTimeout(() => { setIndex(i => i + 1); setOffsetX(0); setAnimating(false) }, 350)
  }

  if (finished) return (
    <ResultScreen score={score} total={countries.length} accentColor="#4a6fa5"
      title={score === countries.length ? 'Идеально! 🎯' : score >= countries.length * 0.7 ? 'Отлично! 💪' : 'Нужно повторить 📚'}
      onRestart={() => { setScore(0); setIndex(0); react('idle') }} onBack={onBack}>
      <p style={{ color: LIGHT.textSub, fontSize: '0.95rem', marginTop: '6px' }}>Угадай флаг страны</p>
    </ResultScreen>
  )

  return (
    <div style={{ minHeight: '100vh', background: LIGHT.bg, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontFamily: "'Segoe UI', sans-serif", userSelect: 'none', padding: '20px' }}>
      <ModeHeader onBack={onBack} title="🏳️ Угадай флаг" current={index + 1} total={countries.length} />
      <AikaBubble state={state} msg={msg} size={100} />
      <div style={{ position: 'relative', width: '375px', height: '440px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {countries[index + 1] && <div style={{ position: 'absolute', width: '375px', height: '440px', background: 'rgba(255,255,255,0.6)', borderRadius: '28px', transform: 'scale(0.95) translateY(12px)', zIndex: 0, border: `1px solid ${LIGHT.border}` }} />}
        <SwipeCard offsetX={offsetX} setOffsetX={setOffsetX} dragging={dragging} setDragging={setDragging} startX={startX}
          onSwipeLeft={() => handleSwipe('left')} onSwipeRight={() => handleSwipe('right')}
          stampYes={`→ ${current.nameA}`} stampNo={`← ${current.nameB}`}
          style={{ width: '375px', height: '440px', background: LIGHT.card, borderRadius: '28px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', boxShadow: LIGHT.cardShadow, overflow: 'hidden', border: offsetX > 50 ? `2px solid ${LIGHT.yes}` : offsetX < -50 ? `2px solid ${LIGHT.no}` : `1.5px solid ${LIGHT.border}` }}>
          <img src={flagUrl(current.codeA)} alt={current.nameA} style={{ width: '250px', height: 'auto', borderRadius: '10px', boxShadow: '0 4px 20px rgba(60,120,200,0.13)', marginBottom: '22px' }} />
          <p style={{ color: LIGHT.textSub, fontSize: '0.9rem', marginBottom: '16px' }}>Чей это флаг?</p>
          <div style={{ display: 'flex', width: '100%', padding: '0 20px', gap: '12px' }}>
            <div style={{ flex: 1, background: LIGHT.noBg, border: `1.5px solid ${LIGHT.noBorder}`, borderRadius: '14px', padding: '12px', textAlign: 'center' }}>
              <div style={{ fontSize: '0.7rem', color: LIGHT.no, marginBottom: '4px', fontWeight: '800' }}>← ВЛЕВО</div>
              <div style={{ fontSize: '1rem', fontWeight: '800', color: LIGHT.text }}>{current.nameB}</div>
            </div>
            <div style={{ flex: 1, background: LIGHT.yesBg, border: `1.5px solid ${LIGHT.yesBorder}`, borderRadius: '14px', padding: '12px', textAlign: 'center' }}>
              <div style={{ fontSize: '0.7rem', color: LIGHT.yes, marginBottom: '4px', fontWeight: '800' }}>ВПРАВО →</div>
              <div style={{ fontSize: '1rem', fontWeight: '800', color: LIGHT.text }}>{current.nameA}</div>
            </div>
          </div>
        </SwipeCard>
      </div>
      <div style={{ marginTop: '14px', color: LIGHT.textLight, fontSize: '0.85rem' }}>Очки: {score} | Осталось: {countries.length - index}</div>
      <YesNoButtons onNo={() => handleSwipe('left')} onYes={() => handleSwipe('right')} />
    </div>
  )
}

// ═══════════════════════════════════════
// РЕЖИМ — БОЛЬШЕ МОСКВЫ
// ═══════════════════════════════════════
function MoscowMode({ onBack }) {
  const [deck] = useState(() => shuffle(moscowCountries))
  const [index, setIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [answers, setAnswers] = useState([])
  const [dragging, setDragging] = useState(false)
  const [offsetX, setOffsetX] = useState(0)
  const [animating, setAnimating] = useState(false)
  const startX = useRef(null)
  const { state, msg, react } = useAika()
  const current = deck[index]
  const finished = index >= deck.length

  const handleSwipe = (isBig) => {
    if (animating) return
    setAnimating(true)
    const ok = isBig === current.big
    if (ok) { setScore(s => s + 1); react('correct') } else { react('wrong') }
    setAnswers(a => [...a, { ...current, ok }])
    setOffsetX(isBig ? 700 : -700)
    setTimeout(() => { setIndex(i => i + 1); setOffsetX(0); setAnimating(false) }, 350)
  }

  if (finished) return (
    <ResultScreen score={score} total={deck.length} accentColor="#2e8b57"
      title={score / deck.length >= 0.9 ? 'Демограф мирового класса!' : score / deck.length >= 0.7 ? 'Отличный результат!' : 'Москва вас удивила!'}
      onRestart={() => { setIndex(0); setScore(0); setAnswers([]); react('idle') }} onBack={onBack}>
      <div style={{ width: '100%', maxWidth: '375px', maxHeight: '240px', overflowY: 'auto', marginTop: '10px', borderRadius: '16px', background: 'white', padding: '8px', border: `1px solid ${LIGHT.border}`, boxShadow: LIGHT.cardShadow }}>
        {answers.map((a, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '6px 8px', borderBottom: `1px solid ${LIGHT.border}` }}>
            <img src={flagUrl(a.code)} alt={a.n} style={{ width: '34px', height: 'auto', borderRadius: '3px' }} />
            <span style={{ flex: 1, fontSize: '0.85rem', fontWeight: '700', color: LIGHT.text }}>{a.n}</span>
            <span style={{ fontSize: '0.8rem', fontWeight: '800', color: a.big ? LIGHT.yes : LIGHT.no }}>{a.pop.toFixed(1)} млн</span>
            <span style={{ color: a.ok ? LIGHT.yes : LIGHT.no, fontWeight: '800' }}>{a.ok ? '✓' : '✗'}</span>
          </div>
        ))}
      </div>
    </ResultScreen>
  )

  return (
    <div style={{ minHeight: '100vh', background: LIGHT.bg, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontFamily: "'Segoe UI', sans-serif", userSelect: 'none', padding: '20px' }}>
      <ModeHeader onBack={onBack} title="🌍 Больше Москвы?" current={index} total={deck.length} />
      <div style={{ background: 'white', border: `1.5px solid ${LIGHT.border}`, borderRadius: '10px', padding: '5px 16px', marginBottom: '10px', fontSize: '0.85rem', color: LIGHT.textSub }}>
        Москва 2026: <strong style={{ color: '#2e8b57' }}>13,3 млн чел.</strong>
      </div>
      <AikaBubble state={state} msg={msg} size={100} />
      <ScoreBar score={score} wrong={index - score} />
      <div style={{ position: 'relative', width: '375px', height: '420px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {deck[index + 1] && <div style={{ position: 'absolute', width: '375px', height: '420px', background: 'rgba(255,255,255,0.6)', borderRadius: '28px', transform: 'scale(0.95) translateY(12px)', zIndex: 0, border: `1px solid ${LIGHT.border}` }} />}
        <SwipeCard offsetX={offsetX} setOffsetX={setOffsetX} dragging={dragging} setDragging={setDragging} startX={startX}
          onSwipeLeft={() => handleSwipe(false)} onSwipeRight={() => handleSwipe(true)} stampYes="БОЛЬШЕ ✓" stampNo="МЕНЬШЕ ✗"
          style={{ width: '375px', height: '420px', background: LIGHT.card, borderRadius: '28px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', boxShadow: LIGHT.cardShadow, overflow: 'hidden', border: offsetX > 50 ? `2px solid ${LIGHT.yes}` : offsetX < -50 ? `2px solid ${LIGHT.no}` : `1.5px solid ${LIGHT.border}` }}>
          <img src={flagUrl(current.code)} alt={current.n} style={{ width: '225px', height: 'auto', borderRadius: '10px', boxShadow: '0 4px 20px rgba(60,120,200,0.13)', marginBottom: '18px' }} />
          <h2 style={{ fontSize: '2rem', margin: '0 0 5px', textAlign: 'center', color: LIGHT.text, fontWeight: '900' }}>{current.n}</h2>
          <p style={{ color: LIGHT.textSub, fontSize: '0.88rem', marginBottom: '18px' }}>{current.r}</p>
          <div style={{ background: LIGHT.badge, border: `1.5px solid ${LIGHT.border}`, borderRadius: '12px', padding: '10px 20px', textAlign: 'center' }}>
            <span style={{ fontSize: '0.88rem', color: LIGHT.textSub }}>Население страны <strong style={{ color: '#2e8b57' }}>больше 13,3 млн</strong>?</span>
          </div>
          <div style={{ display: 'flex', gap: '12px', marginTop: '16px', width: '100%', padding: '0 20px' }}>
            <div style={{ flex: 1, background: LIGHT.noBg, border: `1.5px solid ${LIGHT.noBorder}`, borderRadius: '12px', padding: '10px', textAlign: 'center' }}>
              <div style={{ fontSize: '0.72rem', color: LIGHT.no, fontWeight: '800' }}>← МЕНЬШЕ</div>
            </div>
            <div style={{ flex: 1, background: LIGHT.yesBg, border: `1.5px solid ${LIGHT.yesBorder}`, borderRadius: '12px', padding: '10px', textAlign: 'center' }}>
              <div style={{ fontSize: '0.72rem', color: LIGHT.yes, fontWeight: '800' }}>БОЛЬШЕ →</div>
            </div>
          </div>
        </SwipeCard>
      </div>
      <YesNoButtons onNo={() => handleSwipe(false)} onYes={() => handleSwipe(true)} />
    </div>
  )
}

// ═══════════════════════════════════════
// РЕЖИМ — ГОРОДА РОССИИ
// ═══════════════════════════════════════
function RussiaMode({ onBack }) {
  const [deck] = useState(() => shuffle(russianCities))
  const [index, setIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [answers, setAnswers] = useState([])
  const [dragging, setDragging] = useState(false)
  const [offsetX, setOffsetX] = useState(0)
  const [animating, setAnimating] = useState(false)
  const startX = useRef(null)
  const { state, msg, react } = useAika()
  const current = deck[index]
  const finished = index >= deck.length

  const handleSwipe = (isBig) => {
    if (animating) return
    setAnimating(true)
    const ok = isBig === current.big
    if (ok) { setScore(s => s + 1); react('correct') } else { react('wrong') }
    setAnswers(a => [...a, { ...current, ok }])
    setOffsetX(isBig ? 700 : -700)
    setTimeout(() => { setIndex(i => i + 1); setOffsetX(0); setAnimating(false) }, 350)
  }

  if (finished) return (
    <ResultScreen score={score} total={deck.length} accentColor="#c0392b"
      title={score / deck.length >= 0.9 ? '🏆 Знаток городов России!' : score / deck.length >= 0.75 ? '📊 Отличный результат!' : '📚 Нужно подтянуть!'}
      onRestart={() => { setIndex(0); setScore(0); setAnswers([]); react('idle') }} onBack={onBack}>
      <div style={{ width: '100%', maxWidth: '375px', maxHeight: '240px', overflowY: 'auto', marginTop: '10px', borderRadius: '16px', background: 'white', padding: '8px', border: `1px solid ${LIGHT.border}`, boxShadow: LIGHT.cardShadow }}>
        {answers.map((a, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '6px 8px', borderBottom: `1px solid ${LIGHT.border}` }}>
            <span style={{ fontSize: '1.1rem' }}>🏙️</span>
            <span style={{ flex: 1, fontSize: '0.85rem', fontWeight: '700', color: LIGHT.text }}>{a.n}</span>
            <span style={{ fontSize: '0.8rem', fontWeight: '800', color: a.big ? LIGHT.yes : LIGHT.no }}>{fmtPop(a.pop)}</span>
            <span style={{ color: a.ok ? LIGHT.yes : LIGHT.no, fontWeight: '800' }}>{a.ok ? '✓' : '✗'}</span>
          </div>
        ))}
      </div>
    </ResultScreen>
  )

  return (
    <div style={{ minHeight: '100vh', background: LIGHT.bg, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontFamily: "'Segoe UI', sans-serif", userSelect: 'none', padding: '20px' }}>
      <ModeHeader onBack={onBack} title="🏙️ Города России" current={index} total={deck.length} />
      <div style={{ background: 'white', border: `1.5px solid ${LIGHT.border}`, borderRadius: '10px', padding: '5px 16px', marginBottom: '10px', fontSize: '0.85rem', color: LIGHT.textSub }}>
        Порог: <strong style={{ color: '#c0392b' }}>500 000 человек</strong>
      </div>
      <AikaBubble state={state} msg={msg} size={100} />
      <ScoreBar score={score} wrong={index - score} />
      <div style={{ position: 'relative', width: '375px', height: '480px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {deck[index + 1] && <div style={{ position: 'absolute', width: '375px', height: '480px', background: 'rgba(255,255,255,0.6)', borderRadius: '28px', transform: 'scale(0.95) translateY(12px)', zIndex: 0, border: `1px solid ${LIGHT.border}` }} />}
        <SwipeCard offsetX={offsetX} setOffsetX={setOffsetX} dragging={dragging} setDragging={setDragging} startX={startX}
          onSwipeLeft={() => handleSwipe(false)} onSwipeRight={() => handleSwipe(true)} stampYes="> 500 тыс ✓" stampNo="< 500 тыс ✗"
          style={{ width: '375px', height: '480px', background: LIGHT.card, borderRadius: '28px', display: 'flex', flexDirection: 'column', boxShadow: LIGHT.cardShadow, overflow: 'hidden', border: offsetX > 50 ? `2px solid ${LIGHT.yes}` : offsetX < -50 ? `2px solid ${LIGHT.no}` : `1.5px solid ${LIGHT.border}` }}>
          <div style={{ width: '375px', height: '210px', flexShrink: 0, pointerEvents: 'none', overflow: 'hidden', borderRadius: '28px 28px 0 0' }}>
            <iframe src={mapUrl(current.lat, current.lon)} width="375" height="210" style={{ border: 'none', display: 'block', pointerEvents: 'none' }} title={current.n} />
          </div>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '16px 24px', textAlign: 'center' }}>
            <h2 style={{ fontSize: '1.9rem', margin: '0 0 5px', color: LIGHT.text, fontWeight: '900' }}>{current.n}</h2>
            <p style={{ color: LIGHT.textSub, fontSize: '0.82rem', marginBottom: '16px' }}>{current.r}</p>
            <div style={{ background: LIGHT.badge, border: `1.5px solid ${LIGHT.border}`, borderRadius: '12px', padding: '10px 18px', width: '100%' }}>
              <span style={{ fontSize: '0.88rem', color: LIGHT.textSub }}>Население <strong style={{ color: '#c0392b' }}>больше 500 тыс.</strong>?</span>
            </div>
            <div style={{ display: 'flex', gap: '12px', marginTop: '14px', width: '100%' }}>
              <div style={{ flex: 1, background: LIGHT.noBg, border: `1.5px solid ${LIGHT.noBorder}`, borderRadius: '12px', padding: '10px', textAlign: 'center' }}>
                <div style={{ fontSize: '0.72rem', color: LIGHT.no, fontWeight: '800' }}>← НЕТ</div>
              </div>
              <div style={{ flex: 1, background: LIGHT.yesBg, border: `1.5px solid ${LIGHT.yesBorder}`, borderRadius: '12px', padding: '10px', textAlign: 'center' }}>
                <div style={{ fontSize: '0.72rem', color: LIGHT.yes, fontWeight: '800' }}>ДА →</div>
              </div>
            </div>
          </div>
        </SwipeCard>
      </div>
      <YesNoButtons onNo={() => handleSwipe(false)} onYes={() => handleSwipe(true)} />
    </div>
  )
}

// ═══════════════════════════════════════
// РЕЖИМ — БРИТАНИЯ
// ═══════════════════════════════════════
function BritainMode({ onBack }) {
  const [deck] = useState(() => shuffle(britainCountries))
  const [index, setIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [answers, setAnswers] = useState([])
  const [dragging, setDragging] = useState(false)
  const [offsetX, setOffsetX] = useState(0)
  const [animating, setAnimating] = useState(false)
  const startX = useRef(null)
  const { state, msg, react } = useAika()
  const current = deck[index]
  const finished = index >= deck.length

  const handleSwipe = (invaded) => {
    if (animating) return
    setAnimating(true)
    const ok = invaded === current.invaded
    if (ok) { setScore(s => s + 1); react('correct') } else { react('wrong') }
    setAnswers(a => [...a, { ...current, ok }])
    setOffsetX(invaded ? 700 : -700)
    setTimeout(() => { setIndex(i => i + 1); setOffsetX(0); setAnimating(false) }, 350)
  }

  if (finished) return (
    <ResultScreen score={score} total={deck.length} accentColor="#8b6914"
      title={score / deck.length >= 0.9 ? '🏆 Историк-империалист!' : score / deck.length >= 0.75 ? '📜 Отличное знание истории!' : '🗺 Британия вас удивила!'}
      onRestart={() => { setIndex(0); setScore(0); setAnswers([]); react('idle') }} onBack={onBack}>
      <div style={{ width: '100%', maxWidth: '375px', maxHeight: '240px', overflowY: 'auto', marginTop: '10px', borderRadius: '16px', background: 'white', padding: '8px', border: `1px solid ${LIGHT.border}`, boxShadow: LIGHT.cardShadow }}>
        {answers.map((a, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '6px 8px', borderBottom: `1px solid ${LIGHT.border}` }}>
            <img src={flagUrl(a.code)} alt={a.n} style={{ width: '30px', height: 'auto', borderRadius: '3px', flexShrink: 0 }} />
            <span style={{ flex: 1, fontSize: '0.82rem', fontWeight: '700', color: LIGHT.text }}>{a.n}</span>
            <span style={{ fontSize: '0.68rem', color: LIGHT.textSub, flex: 1.5, textAlign: 'right', lineHeight: 1.3 }}>{a.invaded ? '✅' : '🛡'} {a.fact}</span>
            <span style={{ color: a.ok ? LIGHT.yes : LIGHT.no, flexShrink: 0, fontWeight: '800' }}>{a.ok ? '✓' : '✗'}</span>
          </div>
        ))}
      </div>
    </ResultScreen>
  )

  return (
    <div style={{ minHeight: '100vh', background: LIGHT.bg, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontFamily: "'Segoe UI', sans-serif", userSelect: 'none', padding: '20px' }}>
      <ModeHeader onBack={onBack} title="🇬🇧 Британия вторгалась?" current={index} total={deck.length} />
      <AikaBubble state={state} msg={msg} size={100} />
      <ScoreBar score={score} wrong={index - score} />
      <div style={{ position: 'relative', width: '375px', height: '450px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {deck[index + 1] && <div style={{ position: 'absolute', width: '375px', height: '450px', background: 'rgba(255,255,255,0.6)', borderRadius: '28px', transform: 'scale(0.95) translateY(12px)', zIndex: 0, border: `1px solid ${LIGHT.border}` }} />}
        <SwipeCard offsetX={offsetX} setOffsetX={setOffsetX} dragging={dragging} setDragging={setDragging} startX={startX}
          onSwipeLeft={() => handleSwipe(false)} onSwipeRight={() => handleSwipe(true)} stampYes="ВТОРГАЛАСЬ ✓" stampNo="НЕ ВТОРГАЛАСЬ ✗"
          style={{ width: '375px', height: '450px', background: LIGHT.card, borderRadius: '28px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', boxShadow: LIGHT.cardShadow, overflow: 'hidden', border: offsetX > 50 ? `2px solid ${LIGHT.yes}` : offsetX < -50 ? `2px solid ${LIGHT.no}` : `1.5px solid ${LIGHT.border}` }}>
          <img src={flagUrl(current.code)} alt={current.n} style={{ width: '250px', height: 'auto', borderRadius: '10px', boxShadow: '0 4px 20px rgba(60,120,200,0.13)', marginBottom: '18px' }} />
          <h2 style={{ fontSize: '2rem', margin: '0 0 5px', textAlign: 'center', color: LIGHT.text, fontWeight: '900' }}>{current.n}</h2>
          <p style={{ color: LIGHT.textSub, fontSize: '0.88rem', marginBottom: '18px' }}>{current.r}</p>
          <div style={{ background: LIGHT.badge, border: `1.5px solid ${LIGHT.border}`, borderRadius: '12px', padding: '10px 20px', textAlign: 'center' }}>
            <span style={{ fontSize: '0.88rem', color: LIGHT.textSub }}>Британия <strong style={{ color: '#8b6914' }}>вторгалась</strong> в эту страну?</span>
          </div>
          <div style={{ display: 'flex', gap: '12px', marginTop: '16px', width: '100%', padding: '0 20px' }}>
            <div style={{ flex: 1, background: LIGHT.noBg, border: `1.5px solid ${LIGHT.noBorder}`, borderRadius: '12px', padding: '10px', textAlign: 'center' }}>
              <div style={{ fontSize: '0.72rem', color: LIGHT.no, fontWeight: '800' }}>← НЕТ</div>
            </div>
            <div style={{ flex: 1, background: LIGHT.yesBg, border: `1.5px solid ${LIGHT.yesBorder}`, borderRadius: '12px', padding: '10px', textAlign: 'center' }}>
              <div style={{ fontSize: '0.72rem', color: LIGHT.yes, fontWeight: '800' }}>ДА →</div>
            </div>
          </div>
        </SwipeCard>
      </div>
      <YesNoButtons onNo={() => handleSwipe(false)} onYes={() => handleSwipe(true)} />
    </div>
  )
}

// ═══════════════════════════════════════
// РЕЖИМ — СТОЛИЦЫ
// ═══════════════════════════════════════
function CapitalsMode({ onBack }) {
  const [deck] = useState(() => shuffle(capitalsQuiz))
  const [index, setIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [answers, setAnswers] = useState([])
  const [dragging, setDragging] = useState(false)
  const [offsetX, setOffsetX] = useState(0)
  const [animating, setAnimating] = useState(false)
  const startX = useRef(null)
  const { state, msg, react } = useAika()
  const current = deck[index]
  const finished = index >= deck.length

  const handleSwipe = (isYes) => {
    if (animating) return
    setAnimating(true)
    const ok = isYes === current.isCapital
    if (ok) { setScore(s => s + 1); react('correct') } else { react('wrong') }
    setAnswers(a => [...a, { ...current, ok }])
    setOffsetX(isYes ? 700 : -700)
    setTimeout(() => { setIndex(i => i + 1); setOffsetX(0); setAnimating(false) }, 350)
  }

  if (finished) return (
    <ResultScreen score={score} total={deck.length} accentColor="#1a7a5e"
      title={score / deck.length >= 0.9 ? '🏆 Географ мирового класса!' : score / deck.length >= 0.7 ? '📚 Отличный результат!' : '🗺️ Нужно подтянуть столицы!'}
      onRestart={() => { setIndex(0); setScore(0); setAnswers([]); react('idle') }} onBack={onBack}>
      <div style={{ width: '100%', maxWidth: '375px', maxHeight: '240px', overflowY: 'auto', marginTop: '10px', borderRadius: '16px', background: 'white', padding: '8px', border: `1px solid ${LIGHT.border}`, boxShadow: LIGHT.cardShadow }}>
        {answers.map((a, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '6px 8px', borderBottom: `1px solid ${LIGHT.border}` }}>
            <img src={flagUrl(a.code)} alt={a.country} style={{ width: '30px', height: 'auto', borderRadius: '3px', flexShrink: 0 }} />
            <span style={{ flex: 1, fontSize: '0.85rem', fontWeight: '700', color: LIGHT.text }}>{a.city}</span>
            <span style={{ fontSize: '0.72rem', color: LIGHT.textSub }}>{a.isCapital ? '✅ столица' : `❌ ${a.trap || 'не столица'}`}</span>
            <span style={{ color: a.ok ? LIGHT.yes : LIGHT.no, fontWeight: '800' }}>{a.ok ? '✓' : '✗'}</span>
          </div>
        ))}
      </div>
    </ResultScreen>
  )

  return (
    <div style={{ minHeight: '100vh', background: LIGHT.bg, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontFamily: "'Segoe UI', sans-serif", userSelect: 'none', padding: '20px' }}>
      <ModeHeader onBack={onBack} title="🏛️ Это столица?" current={index + 1} total={deck.length} />
      <AikaBubble state={state} msg={msg} size={100} />
      <ScoreBar score={score} wrong={index - score} />
      <div style={{ position: 'relative', width: '375px', height: '450px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {deck[index + 1] && <div style={{ position: 'absolute', width: '375px', height: '450px', background: 'rgba(255,255,255,0.6)', borderRadius: '28px', transform: 'scale(0.95) translateY(12px)', zIndex: 0, border: `1px solid ${LIGHT.border}` }} />}
        <SwipeCard offsetX={offsetX} setOffsetX={setOffsetX} dragging={dragging} setDragging={setDragging} startX={startX}
          onSwipeLeft={() => handleSwipe(false)} onSwipeRight={() => handleSwipe(true)} stampYes="ДА ✓" stampNo="НЕТ ✗"
          style={{ width: '375px', height: '450px', background: LIGHT.card, borderRadius: '28px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', boxShadow: LIGHT.cardShadow, overflow: 'hidden', border: offsetX > 50 ? `2px solid ${LIGHT.yes}` : offsetX < -50 ? `2px solid ${LIGHT.no}` : `1.5px solid ${LIGHT.border}` }}>
          <img src={flagUrl(current.code)} alt={current.country} style={{ width: '225px', height: 'auto', borderRadius: '10px', boxShadow: '0 4px 20px rgba(60,120,200,0.13)', marginBottom: '20px' }} />
          <h2 style={{ fontSize: '2.2rem', fontWeight: '900', margin: '0 0 6px', textAlign: 'center', color: LIGHT.text }}>{current.city}</h2>
          <p style={{ color: LIGHT.textSub, fontSize: '0.9rem', marginBottom: '20px' }}>{current.country}</p>
          <div style={{ background: LIGHT.badge, border: `1.5px solid ${LIGHT.border}`, borderRadius: '12px', padding: '10px 24px', textAlign: 'center' }}>
            <span style={{ fontSize: '0.9rem', color: LIGHT.textSub }}>Это <strong style={{ color: '#1a7a5e' }}>столица</strong> страны?</span>
          </div>
          <div style={{ display: 'flex', gap: '12px', marginTop: '16px', width: '100%', padding: '0 20px' }}>
            <div style={{ flex: 1, background: LIGHT.noBg, border: `1.5px solid ${LIGHT.noBorder}`, borderRadius: '12px', padding: '10px', textAlign: 'center' }}>
              <div style={{ fontSize: '0.72rem', color: LIGHT.no, fontWeight: '800' }}>← НЕТ</div>
            </div>
            <div style={{ flex: 1, background: LIGHT.yesBg, border: `1.5px solid ${LIGHT.yesBorder}`, borderRadius: '12px', padding: '10px', textAlign: 'center' }}>
              <div style={{ fontSize: '0.72rem', color: LIGHT.yes, fontWeight: '800' }}>ДА →</div>
            </div>
          </div>
        </SwipeCard>
      </div>
      <YesNoButtons onNo={() => handleSwipe(false)} onYes={() => handleSwipe(true)} />
    </div>
  )
}

// ═══════════════════════════════════════
// РЕЖИМ — ВАЛЮТЫ
// ═══════════════════════════════════════
function CurrencyMode({ onBack }) {
  const [deck] = useState(() => shuffle(currencyQuiz))
  const [index, setIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [answers, setAnswers] = useState([])
  const [dragging, setDragging] = useState(false)
  const [offsetX, setOffsetX] = useState(0)
  const [animating, setAnimating] = useState(false)
  const startX = useRef(null)
  const { state, msg, react } = useAika()
  const current = deck[index]
  const finished = index >= deck.length

  const handleSwipe = (isYes) => {
    if (animating) return
    setAnimating(true)
    const ok = isYes === current.isTrue
    if (ok) { setScore(s => s + 1); react('correct') } else { react('wrong') }
    setAnswers(a => [...a, { ...current, ok }])
    setOffsetX(isYes ? 700 : -700)
    setTimeout(() => { setIndex(i => i + 1); setOffsetX(0); setAnimating(false) }, 350)
  }

  if (finished) return (
    <ResultScreen score={score} total={deck.length} accentColor="#b05a10"
      title={score / deck.length >= 0.9 ? '🏆 Финансовый гений!' : score / deck.length >= 0.7 ? '💰 Отличный результат!' : '💸 Нужно подтянуть!'}
      onRestart={() => { setIndex(0); setScore(0); setAnswers([]); react('idle') }} onBack={onBack}>
      <div style={{ width: '100%', maxWidth: '375px', maxHeight: '240px', overflowY: 'auto', marginTop: '10px', borderRadius: '16px', background: 'white', padding: '8px', border: `1px solid ${LIGHT.border}`, boxShadow: LIGHT.cardShadow }}>
        {answers.map((a, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '6px 8px', borderBottom: `1px solid ${LIGHT.border}` }}>
            <img src={flagUrl(a.code)} alt={a.country} style={{ width: '30px', height: 'auto', borderRadius: '3px', flexShrink: 0 }} />
            <span style={{ flex: 1, fontSize: '0.82rem', fontWeight: '700', color: LIGHT.text }}>{a.country}</span>
            <span style={{ fontSize: '0.7rem', color: LIGHT.textSub, flex: 1.5, textAlign: 'right', lineHeight: 1.3 }}>{a.fact}</span>
            <span style={{ color: a.ok ? LIGHT.yes : LIGHT.no, flexShrink: 0, fontWeight: '800' }}>{a.ok ? '✓' : '✗'}</span>
          </div>
        ))}
      </div>
    </ResultScreen>
  )

  return (
    <div style={{ minHeight: '100vh', background: LIGHT.bg, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontFamily: "'Segoe UI', sans-serif", userSelect: 'none', padding: '20px' }}>
      <ModeHeader onBack={onBack} title="💰 Валюты мира" current={index + 1} total={deck.length} />
      <AikaBubble state={state} msg={msg} size={100} />
      <ScoreBar score={score} wrong={index - score} />
      <div style={{ position: 'relative', width: '375px', height: '460px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {deck[index + 1] && <div style={{ position: 'absolute', width: '375px', height: '460px', background: 'rgba(255,255,255,0.6)', borderRadius: '28px', transform: 'scale(0.95) translateY(12px)', zIndex: 0, border: `1px solid ${LIGHT.border}` }} />}
        <SwipeCard offsetX={offsetX} setOffsetX={setOffsetX} dragging={dragging} setDragging={setDragging} startX={startX}
          onSwipeLeft={() => handleSwipe(false)} onSwipeRight={() => handleSwipe(true)} stampYes="ДА ✓" stampNo="НЕТ ✗"
          style={{ width: '375px', height: '460px', background: LIGHT.card, borderRadius: '28px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', boxShadow: LIGHT.cardShadow, overflow: 'hidden', border: offsetX > 50 ? `2px solid ${LIGHT.yes}` : offsetX < -50 ? `2px solid ${LIGHT.no}` : `1.5px solid ${LIGHT.border}` }}>
          <img src={flagUrl(current.code)} alt={current.country} style={{ width: '225px', height: 'auto', borderRadius: '10px', boxShadow: '0 4px 20px rgba(60,120,200,0.13)', marginBottom: '16px' }} />
          <div style={{ fontSize: '2.8rem', marginBottom: '10px' }}>💰</div>
          <h2 style={{ fontSize: '1.25rem', fontWeight: '900', margin: '0 0 6px', textAlign: 'center', color: LIGHT.text, padding: '0 20px', lineHeight: 1.3 }}>{current.question}</h2>
          <div style={{ display: 'flex', gap: '12px', marginTop: '20px', width: '100%', padding: '0 20px' }}>
            <div style={{ flex: 1, background: LIGHT.noBg, border: `1.5px solid ${LIGHT.noBorder}`, borderRadius: '12px', padding: '12px', textAlign: 'center' }}>
              <div style={{ fontSize: '0.72rem', color: LIGHT.no, fontWeight: '800' }}>← НЕТ</div>
            </div>
            <div style={{ flex: 1, background: LIGHT.yesBg, border: `1.5px solid ${LIGHT.yesBorder}`, borderRadius: '12px', padding: '12px', textAlign: 'center' }}>
              <div style={{ fontSize: '0.72rem', color: LIGHT.yes, fontWeight: '800' }}>ДА →</div>
            </div>
          </div>
        </SwipeCard>
      </div>
      <YesNoButtons onNo={() => handleSwipe(false)} onYes={() => handleSwipe(true)} />
    </div>
  )
}

export default function App() {
  const [screen, setScreen] = useState('menu')
  if (screen === 'flags')    return <FlagsMode    onBack={() => setScreen('menu')} />
  if (screen === 'moscow')   return <MoscowMode   onBack={() => setScreen('menu')} />
  if (screen === 'russia')   return <RussiaMode   onBack={() => setScreen('menu')} />
  if (screen === 'britain')  return <BritainMode  onBack={() => setScreen('menu')} />
  if (screen === 'capitals') return <CapitalsMode onBack={() => setScreen('menu')} />
  if (screen === 'currency') return <CurrencyMode onBack={() => setScreen('menu')} />
  return <Menu onSelect={setScreen} />
}
