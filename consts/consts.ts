import {StreetsignColorType} from "./types";

export const ROLES = {
    GUEST: {id: 0, title: 'Гость'},
    MANAGER: {id: 3, title: 'Менеджер'},
    DIRECTOR: {id: 15, title: 'Руководитель'},
    ADMIN: {id: 31, title: 'Администратор'},
}

export const CLASSES = {
    STREETSIGN: 3,
    CLR_STREETSIGN: 9,
}

export const STREETSIGN_COLORS: Array<StreetsignColorType> = [
    { id: 0,  title: 'Синий',              rgb: '#283474', bg_rgb: null,      ORACAL: '049',     RAL: '5002'},
    { id: 1,  title: 'Ультрамариновый',    rgb: '#21419A', bg_rgb: null,      ORACAL: '086',     RAL: '5005'},
    { id: 2,  title: 'Голубой',            rgb: '#0E5FAD', bg_rgb: null,      ORACAL: '052',     RAL: '5015'},
    { id: 3,  title: 'Темно-зеленый',      rgb: '#013C24', bg_rgb: null,      ORACAL: '060',     RAL: '6005'},
    { id: 4,  title: 'Светло-зеленый',     rgb: '#007641', bg_rgb: null,      ORACAL: '068',     RAL: '6029'},
    { id: 5,  title: 'Коричневый',         rgb: '#56351C', bg_rgb: null,      ORACAL: '800',     RAL: '8017'},
    { id: 6,  title: 'Красный',            rgb: '#B42024', bg_rgb: null,      ORACAL: '031',     RAL: '3000'},
    { id: 7,  title: 'Бордовый',           rgb: '#781214', bg_rgb: null,      ORACAL: '312',     RAL: '3005'},
    { id: 8,  title: 'Черный',             rgb: '#070809', bg_rgb: null,      ORACAL: '070',     RAL: '9005'},
    { id: 9,  title: 'Серый',              rgb: '#4A4C4C', bg_rgb: null,      ORACAL: '073',     RAL: '7043'},
    { id: 10, title: 'Коричневый/бежевый', rgb: '#56351C', bg_rgb: '#EAD294', ORACAL: '800/023', RAL: '8017/1014'},
];

export const PRICE_ACP = 0;
export const PRICE_LUM = 1;
export const PRICE_LAM = 2;
export const PRICE_DISCOUNT = 3;

export const STREETSIGNS = {
    // тип => композит, светоотражающая, ламинация, скидка
    '22': [200, 500, 300, 0],
    '23': [300, 500, 300, 0],
    '24': [200, 500, 400, 0],
    '25': [200, 500, 400, 0],

    '27': [300, 500, 300, 0],
    '28': [300, 600, 400, 0],
    '21': [300, 600, 400, 0],
    '2':  [300, 500, 300, 0],

    '5':  [200, 400, 300, 0],
    '32': [300, 600, 400, 0],
    '33': [300, 600, 400, 0],
    '11': [300, 600, 400, 0],

    '26': [400, 700, 400, 0],
    '6':  [100, 400, 300, 0],
    '29': [300, 600, 400, 0],
    '20': [300, 600, 300, 0],

    '18': [300, 600, 400, 0],
}

export const CDEK_API = {
    ACCOUNT: process.env.CDEK_ACCOUNT,
    SECURE_PASSWORD: process.env.CDEK_SECURE_PASSWORD,
    AUTH_URL: process.env.CDEK_AUTH_URL,
    URL: process.env.CDEK_URL,
}

export const COMPANY = {
    name: 'ИП Петрайтис М.В.',
    email: 'splates@splates.ru',
    phone: '8 987 45 46 953',
    phone_href: '+79874546953',
    details: 'ИНН 632118959898, ОГРНИП 320774600420659',
    details_full: 'ИНН 632118959898, ОГРНИП 320774600420659, БИК 044525092, Р/сч 40802810570010276260',
}

export const CONSTS = {
    PICKUP_PRICE: 250,

    CD_COURIER_CDEK: 1,
    CD_PICKUP_CDEK: 2,

    CD_AFTERPAY: 1,
    CD_INVOICE: 2,

    INITIAL_DELIVERY: 2,
    INITIAL_PAYMENT: 1,

    INITIAL_COURIER_CITY: {
        id: null,
        name: '',
        courierPrice: null,
    },

    NOT_WHITE_BG_COLORS: [ 10 ] as Array<number>,

    STREETSIGN_CATEGORY_TITLE: 'Таблички с адресом',

    CART_TITLE: `Корзина товаров`,
    CART_EMPTY_MSG: `Вы пока не добавили в корзину ни одного товара`,

    THANKYOU_TITLE: `Заказ отправлен`,
    THANKYOU_MSG: `Благодарим за обращение в наш интернет-магазин! <br/>В течение ближайших 24 часов мы свяжемся с Вами для согласования деталей заказа`,

    ERROR_404_TITLE: 'Ошибка 404',
    ERROR_404_MSG: 'К сожалению, запрашиваемая страница не найдена',
}

export const MAIN_DOMAIN_CITY = 'Москва'

export const CITIES = {
    arh: 'Архангельск',
    astrahan: 'Астрахань',
    barnaul: 'Барнаул',
    belgorod: 'Белгород',
    bryansk: 'Брянск',
    cheboksary: 'Чебоксары',
    chel: 'Челябинск',
    chelny: 'Набережные Челны',
    cherepovets: 'Череповец',
    chita: 'Чита',
    ekb: 'Екатеринбург',
    grozny: 'Грозный',
    irkutsk: 'Иркутск',
    ivanovo: 'Иваново',
//---
    izhevsk: 'Ижевск',
    kaluga: 'Калуга',
    kazan: 'Казань',
    kemerovo: 'Кемерово',
    khabarovsk: 'Хабаровск',
    kirov: 'Киров',
    kostroma: 'Кострома',
    krasnodar: 'Краснодар',
    krasnoyarsk: 'Красноярск',
    kurgan: 'Курган',
    kursk: 'Курск',
    lipetsk: 'Липецк',
    magnitogorsk: 'Магнитогорск',
    mahachkala: 'Махачкала',
    murmansk: 'Мурманск',
//---
    nalchik: 'Нальчик',
    nn: 'Нижний Новгород',
    novokuznetsk: 'Новокузнецк',
    novorossiysk: 'Новороссийск',
    nsk: 'Новосибирск',
    ola: 'Йошкар-Ола',
    omsk: 'Омск',
    orel: 'Орёл',
    orenburg: 'Оренбург',
    oskol: 'Старый Оскол',
    penza: 'Пенза',
    perm: 'Пермь',
    petrozavodsk: 'Петрозаводск',
    pskov: 'Псков',
    rostov: 'Ростов-на-Дону',
//---
    ryazan: 'Рязань',
    rybinsk: 'Рыбинск',
    samara: 'Самара',
    saransk: 'Саранск',
    saratov: 'Саратов',
    sevastopol: 'Севастополь',
    shahty: 'Шахты',
    simferopol: 'Симферополь',
    skt: 'Сыктывкар',
    smolensk: 'Смоленск',
    sochi: 'Сочи',
    spb: 'Санкт-Петербург',
    stavropol: 'Ставрополь',
    sterlitamak: 'Стерлитамак',
    surgut: 'Сургут',
//---
    taganrog: 'Таганрог',
    tagil: 'Нижний Тагил',
    tambov: 'Тамбов',
    tlt: 'Тольятти',
    tomsk: 'Томск',
//---
    tula: 'Тула',
    tver: 'Тверь',
    tyumen: 'Тюмень',
    ufa: 'Уфа',
    ulanude: 'Улан-Удэ',
    ulyanovsk: 'Ульяновск',
    vladikavkaz: 'Владикавказ',
    vladimir: 'Владимир',
    vladivostok: 'Владивосток',
    volgograd: 'Волгоград',
    vologda: 'Вологда',
    volzhskiy: 'Волжский',
    voronezh: 'Воронеж',
    yalta: 'Ялта',
    yakutsk: 'Якутск',
    yaroslavl: 'Ярославль',
}
