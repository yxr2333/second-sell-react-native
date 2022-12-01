import { Icon, ListItem, Text } from '@rneui/themed';
import React from 'react';

type Props = {
  title: string;
  content: string;
};
const ListEntryItem: React.FC<Props> = ({ title, content }) => {
  return (
    <React.Fragment>
      <ListItem.Content>
        <Text>{title}</Text>
      </ListItem.Content>
      <ListItem.Content right>
        <Text>
          {content}
          <Icon name="chevron-right" type="feather" size={14} />
        </Text>
      </ListItem.Content>
    </React.Fragment>
  );
};

export default ListEntryItem;
