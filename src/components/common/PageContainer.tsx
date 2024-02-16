import styled from 'styled-components';
import { media } from 'app/utils/media';

export const PageContainer = styled.div(
  media.xs({
    display: 'flex',
    flexDirection: 'column',
    padding: '0 10px',
    gap: 10,
    margin: '30px auto 0px auto',
    flexGrow: 1,
    minHeight: 'calc(100% - 110px)',
  }),

  media.xl({
    width: 1170,
    padding: 0,
    gap: 31,
  }),

  media.xxl({
    width: '80vw',
    padding: 0,
    gap: 31,
  })
);
