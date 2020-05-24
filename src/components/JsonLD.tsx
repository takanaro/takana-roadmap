import React from 'react';
import { Helmet } from 'react-helmet';
import config from '../../config/SiteConfig';
import Post from '../models/Post';
import { BreadcrumbList, ListItem, Thing, WithContext } from 'schema-dts';
import { JsonLd } from 'react-schemaorg';
import { LogUtils } from '../utils/logutils';

interface JsonLD {
  breadList: any;
}

export const JsonLD = (props: JsonLD) => {
  let element;

  if (props.breadList != null) {
    element = props.breadList.map((bread: any, index: any) => {
       LogUtils.log(bread);
      return (
        <Helmet key={index} script={[{ type: 'application/ld+json', innerHTML: JSON.stringify(bread) }]} />
      );
    });
  }
  return element;
};
