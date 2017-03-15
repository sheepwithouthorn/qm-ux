/**
 * @author gcy[of1518]
 * @date 16/10/11
 *
 * @description QMPage基于AntD的实现类
 */
import React from 'react';
import {FormUI} from 'qm-ui';

import FormService from './FormService';
import ElementService from './ElementService';

@FormService
export default class Form extends FormUI {
}

@ElementService
class Element extends FormUI.ElementUI {
}
Form.Element = Element;