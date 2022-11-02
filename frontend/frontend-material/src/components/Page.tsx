import Box from '@mui/material/Box';
import {FixedSizeList} from 'react-window';
import {renderRow} from './Row';
import AutoSizer, {Size} from 'react-virtualized-auto-sizer';

export const Example = () => (
  <AutoSizer>

    {({height, width}) => (
      <Box
        sx={{
          width: '100%',
          height: {height},
          backgroundColor: 'red',
          color: 'red',
          maxWidth: 360,
          bgcolor: 'background.paper'
        }}
      >
        <FixedSizeList
          className="List"
          height={height}
          itemCount={1000}
          itemSize={35}
          width={300}
        >
          {renderRow}
        </FixedSizeList>
      </Box>

    )}
  </AutoSizer>


);

export default function Page() {
  return (
    <Box
      sx={{width: '100%', height: '100%', maxWidth: 360, bgcolor: 'background.paper'}}
    >
      <AutoSizer style={{height: '100%'}}>
        {({height, width}: Size) => (
          <FixedSizeList
            className='List'
            height={height}
            width={width}
            itemSize={46}
            itemCount={1000}
            // overscanCount={40}
          >
            {renderRow}
          </FixedSizeList>
        )}
      </AutoSizer>
    </Box>
  );
}
