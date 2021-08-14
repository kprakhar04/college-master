import React, { useState } from 'react';
import MaterialTable from 'material-table';
import { useHistory } from 'react-router-dom';
import { Fragment } from 'react';

const DataTable = ({ headings, data, title, path, onClick }) => {
  const columns = [];
  const history = useHistory();

  headings.forEach((header) => {
    columns.push({
      title: header,
      field: header,
    });
  });

  return (
    <Fragment>
      <MaterialTable
        title={title}
        columns={columns}
        data={data}
        onRowClick={(event, rowData) => {
          console.log(rowData);
          history.push(path + '/' + rowData.id);
        }}
        options={{
          headerStyle: {
            backgroundColor: '#F9DFDC',
            color: '#000000',
            fontSize: '1.1em',
          },
          exportButton: true,
          exportAllData: true,
        }}
      />
    </Fragment>
  );
};

export default DataTable;
