import React from 'react';

import { register, angulars } from '../react-wrapper';

import { k8s } from '../../module/k8s';
import { ResourceHeading } from '../utils';
import { EditRule } from './';

export const EditRuleContainer = () => {
  const {rule, name, ns} = angulars.routeParams;
  const k8sResource = k8s.roles;
  const props = {
    k8sResource,
    rule,
    name,
    namespace: ns
  };
  window.document.title = `Tectonic - ${k8sResource.kind.labelPlural}`;

  return <div>
    <ResourceHeading resourceName="Create Access Rule" />
    <EditRule {...props} />
  </div>;

};

register('EditRuleContainer', EditRuleContainer);
