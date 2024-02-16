import React, { PropsWithChildren } from 'react';
import { Portal } from 'app/components/common/Portal';
import styled from 'styled-components';
import { AnimatePresence, motion } from 'framer-motion';

interface ModalProps {
  show: boolean;
  onDismiss?: () => void;
  dismissible?: boolean;
  title?: string | React.ReactNode;
}

const ModalContainer = styled(motion.div)({
  position: 'absolute',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 100000,
  inset: 0,
});

const ModalContent = styled(motion.div)(({ theme }) => ({
  position: 'relative',
  zIndex: 2,
  minWidth: 300,
  background: theme.bgColorPrimary,
  borderRadius: theme.primaryBorderRadius,
  borderColor: theme.primaryBorderColor,
  borderWidth: 1,
  borderStyle: 'solid',
  display: 'flex',
  flexDirection: 'column',
}));

export const BackgroundOverlay = styled(motion.div)({
  position: 'absolute',
  inset: 0,
  zIndex: 1,
});

const CloseIcon = ({ ...props }) => (
  <motion.svg
    width={14}
    height={14}
    viewBox="0 0 14 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M1 13L13 1"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path
      d="M1 0.999999L13 13"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </motion.svg>
);

export const CloseButton = styled(motion.button)(({ theme }) => ({
  zIndex: 3,
  cursor: 'pointer',
  position: 'absolute',
  top: 16,
  right: 16,
  width: 32,
  height: 32,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: 16,
  padding: 0,
  margin: 0,
  border: 'none',
  color: theme.actionColor,
  background: theme.bgColorPrimary,
  transition: 'background-color 200ms ease, transform 100ms ease',
  '&:active': {
    transform: 'scale(0.9)',
  },
  '&:hover': {
    background: theme.colorPrimary,
  },
}));

const ModalHeader = styled.div(({ theme }) => ({
  top: 0,
  left: 0,
  right: 0,
  display: 'flex',
  height: 64,
  justifyContent: 'center',
  alignItems: 'center',
  padding: '0 52px',
  color: theme.colorPrimary,
}));

const ModalBody = styled.div(({ theme }) => ({
  padding: '0 52px',
  color: theme.actionColor,
  paddingBottom: 32,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
}));

export const Modal: React.FC<PropsWithChildren<ModalProps>> = (props) => {
  const { title, show, onDismiss, dismissible = true } = props;

  const handleDismiss = () => {
    if (dismissible) {
      onDismiss?.();
    }
  };

  return (
    <AnimatePresence>
      {show && (
        <Portal>
          <ModalContainer>
            <BackgroundOverlay
              initial={{ backdropFilter: 'brightness(1)' }}
              animate={{ backdropFilter: 'brightness(0.6)' }}
              exit={{ backdropFilter: 'brightness(1)' }}
              transition={{ duration: 0.2 }}
              onClick={handleDismiss}
            />
            <ModalContent
              initial={{ opacity: 0, transform: 'scale(0.75)' }}
              animate={{ opacity: 1, transform: 'scale(1)' }}
              exit={{ opacity: 0, transform: 'scale(0.75)' }}
              transition={{ duration: 0.2 }}
            >
              <ModalHeader>
                {dismissible && (
                  <CloseButton onClick={onDismiss}>
                    <CloseIcon />
                  </CloseButton>
                )}
                {title}
              </ModalHeader>
              <ModalBody>{props.children}</ModalBody>
            </ModalContent>
          </ModalContainer>
        </Portal>
      )}
    </AnimatePresence>
  );
};
