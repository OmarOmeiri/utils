export const NestedObjArray = [
  {
    id: '60591791d4d41d0a6817d22b',
    value: 'Cor',
    subItem: [
      {
        id: '610d9f71285a7f6c888a4e5a',
        value: 'Foda',
      },
    ],
  },
  {
    id: '611552f970499165d80ff7ec',
    value: undefined,
  },
  {
    id: '60591791d4d41d0a6817d236',
    value: 'Cor',
    subItem: [
      {
        id: '610af5a5588d1e05f829bff1',
        value: '34',
      },
    ],
  },
  {
    id: '60591791d4d41d0a6817d22b',
    value: 'Cor',
    subItem: [
      {
        id: '61156cfd70499165d80ffc50',
        value: 'ddd',
      },
    ],
  },
  {
    id: '60591791d4d41d0a6817d22b',
    value: 'HAHA',
    subItem: [
      {
        id: '61156cfd70499165d80ffc50',
        value: 'ddd',
      },
    ],
  },
];
export const NestedObjArrayWithUndefineds = [
  {
    id: '60591791d4d41d0a6817d22b',
    value: 'Cor',
    subItem: [
      {
        id: '610d9f71285a7f6c888a4e5a',
        value: 'Foda',
      },
    ],
  },
  {
    id: '611552f970499165d80ff7ec',
    value: undefined,
  },
  {
    id: '60591791d4d41d0a6817d236',
    value: 'Cor',
    subItem: [
      {
        id: '610af5a5588d1e05f829bff1',
        value: '34',
        key: undefined,
      },
    ],
  },
  {
    id: '60591791d4d41d0a6817d22b',
    value: 'Cor',
    subItem: [
      {
        id: '61156cfd70499165d80ffc50',
        value: 'ddd',
        subsub: {
          fuck: undefined,
          subsubKey: undefined,
          someothershit: 'shittyBiz',
        },
      },
    ],
  },
  {
    id: '60591791d4d41d0a6817d22b',
    value: 'HAHA',
    subItem: [
      {
        id: '61156cfd70499165d80ffc50',
        value: 'ddd',
      },
    ],
  },
];

export const NestedObjArray2 = {
  '60591791d4d41d0a6817d22b': [
    {
      id: '60591791d4d41d0a6817d22b',
      value: 'Cor',
      subItem: [
        {
          id: '610d9f71285a7f6c888a4e5a',
          value: 'Foda',
        },
      ],
    },
    {
      id: '60591791d4d41d0a6817d22b',
      value: 'Cor',
      subItem: [
        {
          id: '61156cfd70499165d80ffc50',
          value: 'ddd',
        },
      ],
    },
    {
      id: '60591791d4d41d0a6817d22b',
      value: 'HAHA',
      subItem: [
        {
          id: '61156cfd70499165d80ffc50',
          value: 'ddd',
        },
      ],
    },
  ],
  '611552f970499165d80ff7ec': [
    {
      id: '611552f970499165d80ff7ec',
    },
  ],
  '60591791d4d41d0a6817d236': [
    {
      id: '60591791d4d41d0a6817d236',
      value: 'Cor',
      subItem: [
        {
          id: '610af5a5588d1e05f829bff1',
          value: '34',
        },
      ],
    },
  ],
};

export const simpleObjArr = [
  { name: 'dildo', value: 17, group: 'item' },
  { name: 'Dirty toilet', value: 6, group: 'item' },
  { name: 'snake', value: 2, group: 'animal' },
  { name: 'tesla', value: 17, group: 'car' },
  { name: 'gurgel', value: 23, group: 'car' },
];

export const ObjArrayWithDuplicates = [
  {
    id: '60591791d4d41d0a6817d22b',
    value: 'Cor',
    subItem: [
      {
        id: '610d9f71285a7f6c888a4e5a',
        value: 'Foda',
      },
    ],
  },
  {
    id: '60591791d4d41d0a6817d22b',
    value: 'Cor',
    subItem: [
      {
        id: '61156cfd70499165d80ffc50',
        value: 'ddd',
      },
    ],
  },
  {
    id: '60591791d4d41d0a6817d22b',
    value: 'Cor',
    subItem: [
      {
        id: '61156cfd70499165d80ffc50',
        value: 'ddd',
      },
    ],
  },
];

export const ObjectWithNestedArray = {
  id: 1,
  name: '123',
  createdAt: '1020209',
  address: {
    id: 1,
    name: '123',
  },
  variants: [
    20,
    {
      id: 22,
      title: 'hello world',
      name: '123',
      createdAt: '1020209',
      variantOption: {
        id: 1,
        name: '123',
      },
    },
    {
      id: 32,
      name: '123',
      createdAt: '1020209',
    },
  ],
};
export const SimpleObject = {
  id: 1,
  name: '123',
  createdAt: '1020209',
  address: '123',
  variants: 22,
  title: 'hello world',
};

export const SimpleObject2 = {
  id: 1,
  createdAt: '1020209',
  variants: 22,
  title: 'hello world',
};

export const ObjWithDotsInKeys = {
  id: 1,
  'name.name': '123',
  createdAt: '1020209',
  address: {
    'name.name': '123',
  },
  variants: [
    {
      id: 22,
      'name.name': '123',
      variantOption: {
        id: 1,
        'name.name': '123',
      },
    },
    {
      id: 32,
      'name.name': '123',
    },
  ],
};

export const ArrayOfObjsWithDotsInKeys = [
  {
    id: 1,
    'name.name': '123',
    createdAt: '1020209',
    address: {
      'name.name': '123',
    },
    variants: [
      {
        id: 22,
        'name.name': '123',
        variantOption: {
          id: 1,
          'name.name': '123',
        },
      },
      {
        id: 32,
        'name.name': '123',
      },
    ],
  },
  {
    id: 1,
    'name.name': '123',
    createdAt: '1020209',
    address: {
      'name.name': '123',
    },
    variants: [
      {
        id: 22,
        'name.name': '123',
        variantOption: {
          id: 1,
          'name.name': '123',
        },
      },
      {
        id: 32,
        'name.name': '123',
      },
    ],
  },
];

export const toGroupAndMerge = [
  {
    id: '60591791d4d41d0a6817d22b',
    value: 'Cor',
    subItem: [
      {
        id: '610d9f71285a7f6c888a4e5a',
        value: 'Foda',
      },
    ],
  },
  {
    id: '611552f970499165d80ff7ec',
    value: undefined,
  },
  {
    id: '60591791d4d41d0a6817d236',
    value: 'Tamanho',
    subItem: [
      {
        id: '610af5a5588d1e05f829bff1',
        value: '34',
      },
    ],
  },
  {
    id: '60591791d4d41d0a6817d22b',
    value: 'Cor',
    subItem: [
      {
        id: '61156cfd70499165d80ffc50',
        value: 'ddd',
      },
    ],
  },
];

export const restrictedLogInForms = [
  {
    id: 'username-input',
    type: 'inputTypes.text',
    name: 'userName',
    label: 'Usuário',
    row: 0,
    required: true,
    autoComplete: 'off',
    delay: false,
    valid: null,
    style: {
      backgroundColor: 'transparent',
    },
    inputExtraProps: {
      'data-cy': 'username-input',
    },
  },
  {
    id: 'pass-input',
    type: 'inputTypes.password',
    name: 'password',
    label: 'Senha',
    row: 1,
    required: true,
    autoComplete: 'off',
    delay: false,
    valid: null,
    style: {
      backgroundColor: 'transparent',
    },
    inputExtraProps: {
      'data-cy': 'password-input',
    },
  },
];

export const carsArray = [
  {
    make: 'audi',
    model: 'A6',
    style: 'Sedan',
    year: '1996',
  },
  {

    make: 'merc',
    model: 'GLE',
    style: 'SUV',
    year: '2018',
  },
  {

    make: 'audi',
    model: 'A4',
    style: 'Sedan',
    year: '2006',
  },
  {

    make: 'merc',
    model: 'GLE',
    style: 'SUV',
    year: '2017',
  },
  {

    make: 'BMW',
    model: '320i',
    style: 'Sedan',
    year: '2021',
  },
  {

    make: 'BMW',
    model: '330i',
    style: 'Sedan',
    year: '2014',
  },
  {

    make: 'merc',
    model: 'SL300',
    style: 'Sedan',
    year: '1975',
  },
  {

    make: 'audi',
    model: 'A4',
    style: 'Sedan',
    year: '2006',
  },
  {

    make: 'BMW',
    model: 'X6',
    style: 'SUV',
    year: '2014',
  },
  {

    make: 'merc',
    model: 'SL350',
    style: 'Sedan',
    year: '1975',
  },
  {

    make: 'audi',
    model: 'A6',
    style: 'Sedan',
    year: '1996',
  },
  {

    make: 'merc',
    model: 'GLS',
    style: 'SUV',
    year: '2017',
  },
  {
    make: 'audi',
    model: 'A6',
    style: 'Sedan',
    year: '2006',
  },
];

export const Results = {
  ObjectPaths: {
    NestedObjArray: [
      '0.id',
      '0.value',
      '0.subItem.0.id',
      '0.subItem.0.value',
      '1.id',
      '1.value',
      '2.id',
      '2.value',
      '2.subItem.0.id',
      '2.subItem.0.value',
      '3.id',
      '3.value',
      '3.subItem.0.id',
      '3.subItem.0.value',
      '4.id',
      '4.value',
      '4.subItem.0.id',
      '4.subItem.0.value',
    ],
  },
  objectPathsWithValues: {
    NestedObjArray: {
      '0.id': '60591791d4d41d0a6817d22b',
      '0.value': 'Cor',
      '0.subItem.0.id': '610d9f71285a7f6c888a4e5a',
      '0.subItem.0.value': 'Foda',
      '1.id': '611552f970499165d80ff7ec',
      '1.value': undefined,
      '2.id': '60591791d4d41d0a6817d236',
      '2.value': 'Cor',
      '2.subItem.0.id': '610af5a5588d1e05f829bff1',
      '2.subItem.0.value': '34',
      '3.id': '60591791d4d41d0a6817d22b',
      '3.value': 'Cor',
      '3.subItem.0.id': '61156cfd70499165d80ffc50',
      '3.subItem.0.value': 'ddd',
      '4.id': '60591791d4d41d0a6817d22b',
      '4.value': 'HAHA',
      '4.subItem.0.id': '61156cfd70499165d80ffc50',
      '4.subItem.0.value': 'ddd',
    },
  },
  valueByProperty: {
    NestedObjArray2: [
      {
        id: '610d9f71285a7f6c888a4e5a',
        value: 'Foda',
      },
    ],
  },
  valuesByProperty: {
    restrictedLogInForms: [
      'username-input',
      'password-input',
    ],

  },
  getObjPathByKey: {
    ObjectWithNestedArray: ['variants[1].title'],
  },
  omitDeep: {
    ObjectWithNestedArray: {
      id: 1,
      address: { id: 1 },
      variants: [
        20,
        { id: 22, title: 'hello world', variantOption: { id: 1 } },
        { id: 32 },
      ],
    },
  },
  modKeyDeep: {
    ObjWithDotsInKeys: {
      id: 1,
      'name-name': '123',
      createdAt: '1020209',
      address: {
        'name-name': '123',
      },
      variants: [
        {
          id: 22,
          'name-name': '123',
          variantOption: {
            id: 1,
            'name-name': '123',
          },
        },
        {
          id: 32,
          'name-name': '123',
        },
      ],
    },
  },
  matchKeyDeep: {
    ObjWithDotsInKeys: {
      'name.name': '123',
      address: {
        'name.name': '123',
      },
      variants: [
        {
          'name.name': '123',
          variantOption: {
            'name.name': '123',
          },
        },
        {
          'name.name': '123',
        },
      ],
    },
  },
  matchKeyDeepInArray: {
    ArrayOfObjsWithDotsInKeys: [
      {
        'name.name': '123',
        address: {
          'name.name': '123',
        },
        variants: [
          {
            'name.name': '123',
            variantOption: {
              'name.name': '123',
            },
          },
          {
            'name.name': '123',
          },
        ],
      },
      {
        'name.name': '123',
        address: {
          'name.name': '123',
        },
        variants: [
          {
            'name.name': '123',
            variantOption: {
              'name.name': '123',
            },
          },
          {
            'name.name': '123',
          },
        ],
      },
    ],
  },
  matchKeyShallow: {
    ObjWithDotsInKeys: {
      'name.name': '123',
    },
  },
  getValueByKey: {
    ObjectWithNestedArray: 'hello world',
  },
  getKeyByValue: {
    ObjectWithNestedArray: 'name',
  },

  rmvObjDuplicates: {
    ObjArrayWithDuplicates: [{
      id: '60591791d4d41d0a6817d22b',
      value: 'Cor',
      subItem: [
        {
          id: '610d9f71285a7f6c888a4e5a',
          value: 'Foda',
        },
      ],
    },
    {
      id: '60591791d4d41d0a6817d22b',
      value: 'Cor',
      subItem: [
        {
          id: '61156cfd70499165d80ffc50',
          value: 'ddd',
        },
      ],
    }],
  },
  getObjPaths: {
    NestedObjArray: [
      '[0]',
      '[0].id',
      '[0].value',
      '[0].subItem',
      '[0].subItem[0]',
      '[0].subItem[0].id',
      '[0].subItem[0].value',
      '[1]',
      '[1].id',
      '[1].value',
      '[2]',
      '[2].id',
      '[2].value',
      '[2].subItem',
      '[2].subItem[0]',
      '[2].subItem[0].id',
      '[2].subItem[0].value',
      '[3]',
      '[3].id',
      '[3].value',
      '[3].subItem',
      '[3].subItem[0]',
      '[3].subItem[0].id',
      '[3].subItem[0].value',
      '[4]',
      '[4].id',
      '[4].value',
      '[4].subItem',
      '[4].subItem[0]',
      '[4].subItem[0].id',
      '[4].subItem[0].value',

    ],
  },
  filterObjUndefined: {
    NestedObjArrayWithUndefineds: [
      {
        id: '60591791d4d41d0a6817d22b',
        value: 'Cor',
        subItem: [
          {
            id: '610d9f71285a7f6c888a4e5a',
            value: 'Foda',
          },
        ],
      },
      {
        id: '611552f970499165d80ff7ec',
      },
      {
        id: '60591791d4d41d0a6817d236',
        value: 'Cor',
        subItem: [
          {
            id: '610af5a5588d1e05f829bff1',
            value: '34',
          },
        ],
      },
      {
        id: '60591791d4d41d0a6817d22b',
        value: 'Cor',
        subItem: [
          {
            id: '61156cfd70499165d80ffc50',
            value: 'ddd',
            subsub: {
              someothershit: 'shittyBiz',
            },
          },
        ],
      },
      {
        id: '60591791d4d41d0a6817d22b',
        value: 'HAHA',
        subItem: [
          {
            id: '61156cfd70499165d80ffc50',
            value: 'ddd',
          },
        ],
      },
    ],
  },
  filterObjectByKeyValue: {
    SimpleObject: {
      name: '123',
      address: '123',
    },
  },
  filterObjectKeys: {
    SimpleObject: {
      name: '123',
      address: '123',
      variants: 22,
      title: 'hello world',
    },
  },

  modObjPropsShallow: {
    SimpleObject: {
      id: '10',
      name: '123',
      createdAt: '10',
      address: '123',
      variants: 22,
      title: 'hello world',
    },
  },
  groupBy: {
    NestedObjArray_GroupById: {
      '60591791d4d41d0a6817d22b': [
        {
          id: '60591791d4d41d0a6817d22b',
          value: 'Cor',
          subItem: [
            {
              id: '610d9f71285a7f6c888a4e5a',
              value: 'Foda',
            },
          ],
        },
        {
          id: '60591791d4d41d0a6817d22b',
          value: 'Cor',
          subItem: [
            {
              id: '61156cfd70499165d80ffc50',
              value: 'ddd',
            },
          ],
        },
        {
          id: '60591791d4d41d0a6817d22b',
          value: 'HAHA',
          subItem: [
            {
              id: '61156cfd70499165d80ffc50',
              value: 'ddd',
            },
          ],
        },
      ],
      '611552f970499165d80ff7ec': [
        {
          id: '611552f970499165d80ff7ec',
        },
      ],
      '60591791d4d41d0a6817d236': [
        {
          id: '60591791d4d41d0a6817d236',
          value: 'Cor',
          subItem: [
            {
              id: '610af5a5588d1e05f829bff1',
              value: '34',
            },
          ],
        },
      ],
    },
    NestedObjArray_GroupByValue: {
      Cor: [
        {
          id: '60591791d4d41d0a6817d22b',
          value: 'Cor',
          subItem: [
            {
              id: '610d9f71285a7f6c888a4e5a',
              value: 'Foda',
            },
          ],
        },
        {
          id: '60591791d4d41d0a6817d236',
          value: 'Cor',
          subItem: [
            {
              id: '610af5a5588d1e05f829bff1',
              value: '34',
            },
          ],
        },
        {
          id: '60591791d4d41d0a6817d22b',
          value: 'Cor',
          subItem: [
            {
              id: '61156cfd70499165d80ffc50',
              value: 'ddd',
            },
          ],
        },
      ],
      HAHA: [
        {
          id: '60591791d4d41d0a6817d22b',
          value: 'HAHA',
          subItem: [
            {
              id: '61156cfd70499165d80ffc50',
              value: 'ddd',
            },
          ],
        },
      ],
    },
    NestedObjArray_GroupByMultiKey: {
      'Cor-Foda': [
        {
          id: '60591791d4d41d0a6817d22b',
          value: 'Cor',
          subItem: [
            {
              id: '610d9f71285a7f6c888a4e5a',
              value: 'Foda',
            },
          ],
        },

      ],
      'Cor-34': [
        {
          id: '60591791d4d41d0a6817d236',
          value: 'Cor',
          subItem: [
            {
              id: '610af5a5588d1e05f829bff1',
              value: '34',
            },
          ],
        },
      ],
      'Cor-ddd': [
        {
          id: '60591791d4d41d0a6817d22b',
          value: 'Cor',
          subItem: [
            {
              id: '61156cfd70499165d80ffc50',
              value: 'ddd',
            },
          ],
        },
      ],
      'HAHA-ddd': [
        {
          id: '60591791d4d41d0a6817d22b',
          value: 'HAHA',
          subItem: [
            {
              id: '61156cfd70499165d80ffc50',
              value: 'ddd',
            },
          ],
        },
      ],
    },
  },
  groupByMulti: {
    carsArray_GroupByMakeAndModel: {
      audi: {
        A6: [
          {
            make: 'audi',
            model: 'A6',
            style: 'Sedan',
            year: '1996',
          },
          {
            make: 'audi',
            model: 'A6',
            style: 'Sedan',
            year: '1996',
          },
          {
            make: 'audi',
            model: 'A6',
            style: 'Sedan',
            year: '2006',
          },
        ],
        A4: [
          {
            make: 'audi',
            model: 'A4',
            style: 'Sedan',
            year: '2006',
          },
          {
            make: 'audi',
            model: 'A4',
            style: 'Sedan',
            year: '2006',
          },
        ],
      },
      merc: {
        GLE: [
          {
            make: 'merc',
            model: 'GLE',
            style: 'SUV',
            year: '2018',
          },
          {
            make: 'merc',
            model: 'GLE',
            style: 'SUV',
            year: '2017',
          },
        ],
        SL300: [
          {
            make: 'merc',
            model: 'SL300',
            style: 'Sedan',
            year: '1975',
          },
        ],
        SL350: [
          {
            make: 'merc',
            model: 'SL350',
            style: 'Sedan',
            year: '1975',
          },
        ],
        GLS: [
          {
            make: 'merc',
            model: 'GLS',
            style: 'SUV',
            year: '2017',
          },
        ],
      },
      BMW: {
        '320i': [
          {
            make: 'BMW',
            model: '320i',
            style: 'Sedan',
            year: '2021',
          },
        ],
        '330i': [
          {
            make: 'BMW',
            model: '330i',
            style: 'Sedan',
            year: '2014',
          },
        ],
        X6: [
          {
            make: 'BMW',
            model: 'X6',
            style: 'SUV',
            year: '2014',
          },
        ],
      },
    },
    carsArray_GroupByMakeModelAndYear: {
      audi: {
        A6: {
          1996: [
            {
              make: 'audi',
              model: 'A6',
              style: 'Sedan',
              year: '1996',
            },
            {
              make: 'audi',
              model: 'A6',
              style: 'Sedan',
              year: '1996',
            },
          ],
          2006: [
            {
              make: 'audi',
              model: 'A6',
              style: 'Sedan',
              year: '2006',
            },
          ],
        },
        A4: {
          2006: [
            {
              make: 'audi',
              model: 'A4',
              style: 'Sedan',
              year: '2006',
            },
            {
              make: 'audi',
              model: 'A4',
              style: 'Sedan',
              year: '2006',
            },
          ],
        },
      },
      merc: {
        GLE: {
          2017: [
            {
              make: 'merc',
              model: 'GLE',
              style: 'SUV',
              year: '2017',
            },
          ],
          2018: [
            {
              make: 'merc',
              model: 'GLE',
              style: 'SUV',
              year: '2018',
            },
          ],
        },
        SL300: {
          1975: [
            {
              make: 'merc',
              model: 'SL300',
              style: 'Sedan',
              year: '1975',
            },
          ],
        },
        SL350: {
          1975: [
            {
              make: 'merc',
              model: 'SL350',
              style: 'Sedan',
              year: '1975',
            },
          ],
        },
        GLS: {
          2017: [
            {
              make: 'merc',
              model: 'GLS',
              style: 'SUV',
              year: '2017',
            },
          ],
        },
      },
      BMW: {
        '320i': {
          2021: [
            {
              make: 'BMW',
              model: '320i',
              style: 'Sedan',
              year: '2021',
            },
          ],
        },
        '330i': {
          2014: [
            {
              make: 'BMW',
              model: '330i',
              style: 'Sedan',
              year: '2014',
            },
          ],
        },
        X6: {
          2014: [
            {
              make: 'BMW',
              model: 'X6',
              style: 'SUV',
              year: '2014',
            },
          ],
        },
      },
    },
  },
  mergeObjArr: {
    simpleObjArr: {
      name: [
        'dildo',
        'Dirty toilet',
        'snake',
        'tesla',
        'gurgel',
      ],
      value: [
        17,
        6,
        2,
        23,
      ],
      group: [
        'item',
        'animal',
        'car',
      ],
    },
  },
  groupByAndMerge: {
    toGroupAndMerge: [
      {
        id: '60591791d4d41d0a6817d22b',
        value: 'Cor',
        subItem: [
          {
            id: '610d9f71285a7f6c888a4e5a',
            value: 'Foda',
          },
          {
            id: '61156cfd70499165d80ffc50',
            value: 'ddd',
          },
        ],
      },
      {
        id: '611552f970499165d80ff7ec',
      },
      {
        id: '60591791d4d41d0a6817d236',
        value: 'Tamanho',
        subItem: [
          {
            id: '610af5a5588d1e05f829bff1',
            value: '34',
          },
        ],
      },
    ],
  },
};
