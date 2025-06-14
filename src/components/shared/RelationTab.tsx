/* eslint-disable prettier/prettier */
import { Box, Loader, Pagination, useTabs } from '@adminjs/design-system';
import { ReduxState, useQueryParams } from 'adminjs';
import React from 'react';
import { useSelector } from 'react-redux';
import { useRelationRecords } from '../../hooks/useRelationRecords';
import { useRelationConfig } from '../../providers/RelationConfigProvider';
import { RelationRecordsTable as ManyToManyRelationRecordsTable } from '../many-to-many/RelationRecordsTable';
import { RelationResourceActions as ManyToManyRelationResourceActions } from '../many-to-many/RelationResourceActions';
import { RelationRecordsTable as OneToManyRelationRecordsTable } from '../one-to-many/RelationRecordsTable';
import { RelationResourceActions as OneToManyRelationResourceActions } from '../one-to-many/RelationResourceActions';
import allowOverride from './allow-override';
import { ManyToManyRelationOptions } from '@/global-types';
import { RelationType } from '@/constants';

const RelationTab = () => {
  const { relation, ownerRecord, ownerResource, relations } = useRelationConfig();

  const resources = useSelector((state: ReduxState) => state.resources);
  const { storeParams } = useQueryParams();
  const { currentTab } = useTabs();

  const targetResourceId = relations[relation].target.resourceId;
  const junctionResourceId = (relations[relation] as ManyToManyRelationOptions).junction?.throughResourceId;
  const relationType = relations[relation].type;

  const { data, isLoading } = useRelationRecords({
    record: ownerRecord,
    relation,
    resource: ownerResource,
    targetResourceId,
    tab: currentTab,
  });

  const handlePageChange = (page: any) => {
    storeParams({
      page: page.toString(),
    });
  };

  if (currentTab !== relation) {
    return null;
  }

  if (!data) {
    return <Loader />;
  }

  if (relationType === RelationType.OneToMany) {
    const targetResource = resources.find((resource) => resource.id === targetResourceId);
    if (!targetResource) {
      return null;
    }

    const {
      records,
      meta: { total, page, perPage },
    } = data;

    return (
      <Box py="xl">
        <OneToManyRelationResourceActions targetResource={targetResource} />
        <OneToManyRelationRecordsTable targetResource={targetResource} records={records} isLoading={isLoading} />
        <Box flex justifyContent="center" mt="xl">
          <Pagination total={total} perPage={perPage} page={+page} onChange={handlePageChange} />
        </Box>
      </Box>
    );
  }

  if (relationType === RelationType.ManyToMany) {
    if (!junctionResourceId) {
      return null;
    }

    const targetResource = resources.find((resource) => resource.id === targetResourceId);
    const junctionResource = resources.find((resource) => resource.id === junctionResourceId);

    if (!targetResource || !junctionResource) {
      return null;
    }

    const {
      records,
      meta: { total, page, perPage },
    } = data;

    return (
      <Box py="xl">
        <ManyToManyRelationResourceActions
          targetResource={targetResource}
          ownerResource={ownerResource}
          junctionResource={junctionResource}
        />
        <ManyToManyRelationRecordsTable targetResource={targetResource} records={records} isLoading={isLoading} />
        <Box flex justifyContent="center" mt="xl">
          <Pagination total={total} perPage={perPage} page={+page} onChange={handlePageChange} />
        </Box>
      </Box>
    );
  }

  return null;
};

const OverridableRelationTab = allowOverride(RelationTab, 'RelationTab')

export {
  OverridableRelationTab as default,
  OverridableRelationTab as RelationTab,
  RelationTab as OriginalRelationTab,
}
