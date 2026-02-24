'use client';

import Link from 'next/link';
import React from 'react';
import {
  Hits,
  SearchBox,
  RefinementList,
  DynamicWidgets,
  Configure,
} from 'react-instantsearch';
import { InstantSearchNext } from 'react-instantsearch-nextjs';

import { Hit } from '../components/Hit';
import { Panel } from '../components/Panel';
import { QueryId } from '../components/QueryId';
import { client } from '../lib/client';

import { useRefinementList } from 'react-instantsearch';

function VirtualFacet({ attribute }: { attribute: string }) {
  const { items } = useRefinementList({ attribute });

  return null;
}

export default function Search() {

  const facets = ['brand', 'hierarchicalCategories.lvl0', 'categories', 'price'];


  return (
    <InstantSearchNext
      searchClient={client}
      indexName="instant_search"
      routing
      insights={false}
    >
      {facets.map((attribute) => (
        <VirtualFacet key={attribute} attribute={attribute} />
      ))}
      <Configure filters={`categories:audio`} />
      <div className="Container">
        <div>
          <DynamicWidgets facets={['*']} maxValuesPerFacet={1000} fallbackComponent={FallbackComponent} />
        </div>
        <div>
          <SearchBox />
          <Hits hitComponent={Hit} />
        </div>
      </div>
      <QueryId />
      <Link href="/layout" id="link">
        Other page
      </Link>
    </InstantSearchNext>
  );
}

function FallbackComponent({ attribute }: { attribute: string }) {
  return (
    <Panel header={attribute}>
      <RefinementList attribute={attribute} />
    </Panel>
  );
}
