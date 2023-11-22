import React from 'react';
import { render, fireEvent, waitFor, screen, cleanup } from '@testing-library/react';
import renderer from 'react-test-renderer';
import { UsersTabelContent } from '../components/views/UsersTabelContent';


describe('UserTabelContent', () => {
  // peab mockima userlisti, sest muidu ei loo snapshotti, kuna return users.map Cannot read properties of undefined 
  it('matches snapshot', () => {
    const mockUsers = [
      { firstName: 'John', lastName: 'Doe', email: 'john@example.com', role: 'admin' }
    ];
    const mockRoleOptions = [{ label: 'Admin', value: 'admin' }];
    const { tree } = renderer.create(
      <UsersTabelContent 
        users={mockUsers} 
        roleOptions={mockRoleOptions}
      />
    ).toJSON;
    expect(tree).toMatchSnapshot();
  });
});
