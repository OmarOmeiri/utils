export declare const NestedObjArray: ({
    id: string;
    value: string;
    subItem: {
        id: string;
        value: string;
    }[];
} | {
    id: string;
    value: undefined;
    subItem?: undefined;
})[];
export declare const NestedObjArrayWithUndefineds: ({
    id: string;
    value: string;
    subItem: {
        id: string;
        value: string;
    }[];
} | {
    id: string;
    value: undefined;
    subItem?: undefined;
} | {
    id: string;
    value: string;
    subItem: {
        id: string;
        value: string;
        key: undefined;
    }[];
} | {
    id: string;
    value: string;
    subItem: {
        id: string;
        value: string;
        subsub: {
            fuck: undefined;
            subsubKey: undefined;
            someothershit: string;
        };
    }[];
})[];
export declare const NestedObjArray2: {
    '60591791d4d41d0a6817d22b': {
        id: string;
        value: string;
        subItem: {
            id: string;
            value: string;
        }[];
    }[];
    '611552f970499165d80ff7ec': {
        id: string;
    }[];
    '60591791d4d41d0a6817d236': {
        id: string;
        value: string;
        subItem: {
            id: string;
            value: string;
        }[];
    }[];
};
export declare const simpleObjArr: {
    name: string;
    value: number;
    group: string;
}[];
export declare const ObjArrayWithDuplicates: {
    id: string;
    value: string;
    subItem: {
        id: string;
        value: string;
    }[];
}[];
export declare const ObjectWithNestedArray: {
    id: number;
    name: string;
    createdAt: string;
    address: {
        id: number;
        name: string;
    };
    variants: (number | {
        id: number;
        title: string;
        name: string;
        createdAt: string;
        variantOption: {
            id: number;
            name: string;
        };
    } | {
        id: number;
        name: string;
        createdAt: string;
        title?: undefined;
        variantOption?: undefined;
    })[];
};
export declare const SimpleObject: {
    id: number;
    name: string;
    createdAt: string;
    address: string;
    variants: number;
    title: string;
};
export declare const SimpleObject2: {
    id: number;
    createdAt: string;
    variants: number;
    title: string;
};
export declare const ObjWithDotsInKeys: {
    id: number;
    'name.name': string;
    createdAt: string;
    address: {
        'name.name': string;
    };
    variants: ({
        id: number;
        'name.name': string;
        variantOption: {
            id: number;
            'name.name': string;
        };
    } | {
        id: number;
        'name.name': string;
        variantOption?: undefined;
    })[];
};
export declare const ArrayOfObjsWithDotsInKeys: {
    id: number;
    'name.name': string;
    createdAt: string;
    address: {
        'name.name': string;
    };
    variants: ({
        id: number;
        'name.name': string;
        variantOption: {
            id: number;
            'name.name': string;
        };
    } | {
        id: number;
        'name.name': string;
        variantOption?: undefined;
    })[];
}[];
export declare const toGroupAndMerge: ({
    id: string;
    value: string;
    subItem: {
        id: string;
        value: string;
    }[];
} | {
    id: string;
    value: undefined;
    subItem?: undefined;
})[];
export declare const restrictedLogInForms: {
    id: string;
    type: string;
    name: string;
    label: string;
    row: number;
    required: boolean;
    autoComplete: string;
    delay: boolean;
    valid: null;
    style: {
        backgroundColor: string;
    };
    inputExtraProps: {
        'data-cy': string;
    };
}[];
export declare const carsArray: {
    make: string;
    model: string;
    style: string;
    year: string;
}[];
export declare const Results: {
    ObjectPaths: {
        NestedObjArray: string[];
    };
    objectPathsWithValues: {
        NestedObjArray: {
            '0.id': string;
            '0.value': string;
            '0.subItem.0.id': string;
            '0.subItem.0.value': string;
            '1.id': string;
            '1.value': undefined;
            '2.id': string;
            '2.value': string;
            '2.subItem.0.id': string;
            '2.subItem.0.value': string;
            '3.id': string;
            '3.value': string;
            '3.subItem.0.id': string;
            '3.subItem.0.value': string;
            '4.id': string;
            '4.value': string;
            '4.subItem.0.id': string;
            '4.subItem.0.value': string;
        };
    };
    valueByProperty: {
        NestedObjArray2: {
            id: string;
            value: string;
        }[];
    };
    valuesByProperty: {
        restrictedLogInForms: string[];
    };
    getObjPathByKey: {
        ObjectWithNestedArray: string[];
    };
    omitDeep: {
        ObjectWithNestedArray: {
            id: number;
            address: {
                id: number;
            };
            variants: (number | {
                id: number;
                title: string;
                variantOption: {
                    id: number;
                };
            } | {
                id: number;
                title?: undefined;
                variantOption?: undefined;
            })[];
        };
    };
    modKeyDeep: {
        ObjWithDotsInKeys: {
            id: number;
            'name-name': string;
            createdAt: string;
            address: {
                'name-name': string;
            };
            variants: ({
                id: number;
                'name-name': string;
                variantOption: {
                    id: number;
                    'name-name': string;
                };
            } | {
                id: number;
                'name-name': string;
                variantOption?: undefined;
            })[];
        };
    };
    matchKeyDeep: {
        ObjWithDotsInKeys: {
            'name.name': string;
            address: {
                'name.name': string;
            };
            variants: ({
                'name.name': string;
                variantOption: {
                    'name.name': string;
                };
            } | {
                'name.name': string;
                variantOption?: undefined;
            })[];
        };
    };
    matchKeyDeepInArray: {
        ArrayOfObjsWithDotsInKeys: {
            'name.name': string;
            address: {
                'name.name': string;
            };
            variants: ({
                'name.name': string;
                variantOption: {
                    'name.name': string;
                };
            } | {
                'name.name': string;
                variantOption?: undefined;
            })[];
        }[];
    };
    matchKeyShallow: {
        ObjWithDotsInKeys: {
            'name.name': string;
        };
    };
    getValueByKey: {
        ObjectWithNestedArray: string;
    };
    getKeyByValue: {
        ObjectWithNestedArray: string;
    };
    rmvObjDuplicates: {
        ObjArrayWithDuplicates: {
            id: string;
            value: string;
            subItem: {
                id: string;
                value: string;
            }[];
        }[];
    };
    getObjPaths: {
        NestedObjArray: string[];
    };
    filterObjUndefined: {
        NestedObjArrayWithUndefineds: ({
            id: string;
            value: string;
            subItem: {
                id: string;
                value: string;
            }[];
        } | {
            id: string;
            value?: undefined;
            subItem?: undefined;
        } | {
            id: string;
            value: string;
            subItem: {
                id: string;
                value: string;
                subsub: {
                    someothershit: string;
                };
            }[];
        })[];
    };
    filterObjectByKeyValue: {
        SimpleObject: {
            name: string;
            address: string;
        };
    };
    filterObjectKeys: {
        SimpleObject: {
            name: string;
            address: string;
            variants: number;
            title: string;
        };
    };
    modObjPropsShallow: {
        SimpleObject: {
            id: string;
            name: string;
            createdAt: string;
            address: string;
            variants: number;
            title: string;
        };
    };
    groupBy: {
        NestedObjArray_GroupById: {
            '60591791d4d41d0a6817d22b': {
                id: string;
                value: string;
                subItem: {
                    id: string;
                    value: string;
                }[];
            }[];
            '611552f970499165d80ff7ec': {
                id: string;
            }[];
            '60591791d4d41d0a6817d236': {
                id: string;
                value: string;
                subItem: {
                    id: string;
                    value: string;
                }[];
            }[];
        };
        NestedObjArray_GroupByValue: {
            Cor: {
                id: string;
                value: string;
                subItem: {
                    id: string;
                    value: string;
                }[];
            }[];
            HAHA: {
                id: string;
                value: string;
                subItem: {
                    id: string;
                    value: string;
                }[];
            }[];
        };
        NestedObjArray_GroupByMultiKey: {
            'Cor-Foda': {
                id: string;
                value: string;
                subItem: {
                    id: string;
                    value: string;
                }[];
            }[];
            'Cor-34': {
                id: string;
                value: string;
                subItem: {
                    id: string;
                    value: string;
                }[];
            }[];
            'Cor-ddd': {
                id: string;
                value: string;
                subItem: {
                    id: string;
                    value: string;
                }[];
            }[];
            'HAHA-ddd': {
                id: string;
                value: string;
                subItem: {
                    id: string;
                    value: string;
                }[];
            }[];
        };
    };
    groupByMulti: {
        carsArray_GroupByMakeAndModel: {
            audi: {
                A6: {
                    make: string;
                    model: string;
                    style: string;
                    year: string;
                }[];
                A4: {
                    make: string;
                    model: string;
                    style: string;
                    year: string;
                }[];
            };
            merc: {
                GLE: {
                    make: string;
                    model: string;
                    style: string;
                    year: string;
                }[];
                SL300: {
                    make: string;
                    model: string;
                    style: string;
                    year: string;
                }[];
                SL350: {
                    make: string;
                    model: string;
                    style: string;
                    year: string;
                }[];
                GLS: {
                    make: string;
                    model: string;
                    style: string;
                    year: string;
                }[];
            };
            BMW: {
                '320i': {
                    make: string;
                    model: string;
                    style: string;
                    year: string;
                }[];
                '330i': {
                    make: string;
                    model: string;
                    style: string;
                    year: string;
                }[];
                X6: {
                    make: string;
                    model: string;
                    style: string;
                    year: string;
                }[];
            };
        };
        carsArray_GroupByMakeModelAndYear: {
            audi: {
                A6: {
                    1996: {
                        make: string;
                        model: string;
                        style: string;
                        year: string;
                    }[];
                    2006: {
                        make: string;
                        model: string;
                        style: string;
                        year: string;
                    }[];
                };
                A4: {
                    2006: {
                        make: string;
                        model: string;
                        style: string;
                        year: string;
                    }[];
                };
            };
            merc: {
                GLE: {
                    2017: {
                        make: string;
                        model: string;
                        style: string;
                        year: string;
                    }[];
                    2018: {
                        make: string;
                        model: string;
                        style: string;
                        year: string;
                    }[];
                };
                SL300: {
                    1975: {
                        make: string;
                        model: string;
                        style: string;
                        year: string;
                    }[];
                };
                SL350: {
                    1975: {
                        make: string;
                        model: string;
                        style: string;
                        year: string;
                    }[];
                };
                GLS: {
                    2017: {
                        make: string;
                        model: string;
                        style: string;
                        year: string;
                    }[];
                };
            };
            BMW: {
                '320i': {
                    2021: {
                        make: string;
                        model: string;
                        style: string;
                        year: string;
                    }[];
                };
                '330i': {
                    2014: {
                        make: string;
                        model: string;
                        style: string;
                        year: string;
                    }[];
                };
                X6: {
                    2014: {
                        make: string;
                        model: string;
                        style: string;
                        year: string;
                    }[];
                };
            };
        };
    };
    mergeObjArr: {
        simpleObjArr: {
            name: string[];
            value: number[];
            group: string[];
        };
    };
    groupByAndMerge: {
        toGroupAndMerge: ({
            id: string;
            value: string;
            subItem: {
                id: string;
                value: string;
            }[];
        } | {
            id: string;
            value?: undefined;
            subItem?: undefined;
        })[];
    };
};
