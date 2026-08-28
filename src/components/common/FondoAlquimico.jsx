import styled, { keyframes } from "styled-components";

const flotar = keyframes`
  0%, 100% { transform: translate3d(0, 0, 0) scale(1); }
  50% { transform: translate3d(20px, -24px, 0) scale(1.08); }
`;

const Ambiente = styled.div`
  position: fixed;
  inset: 0;
  z-index: -1;
  overflow: hidden;
  pointer-events: none;
  background:
    radial-gradient(circle at 13% 8%, rgba(100, 70, 190, 0.2), transparent 29%),
    radial-gradient(circle at 88% 17%, rgba(45, 190, 205, 0.11), transparent 24%),
    linear-gradient(160deg, #080a16 0%, #0c1023 48%, #080a16 100%);

  &::before,
  &::after {
    content: "";
    position: absolute;
    width: 22rem;
    height: 22rem;
    border-radius: 999px;
    filter: blur(88px);
    opacity: 0.16;
    animation: ${flotar} 15s ease-in-out infinite;
  }

  &::before {
    top: 18%;
    left: -8rem;
    background: #9b87f5;
  }

  &::after {
    right: -9rem;
    bottom: 12%;
    background: #55d9e8;
    animation-delay: -7s;
  }
`;

const Trama = styled.div`
  position: absolute;
  inset: 0;
  opacity: 0.2;
  background-image:
    linear-gradient(rgba(255, 255, 255, 0.025) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.025) 1px, transparent 1px);
  background-size: 52px 52px;
  mask-image: linear-gradient(to bottom, black, transparent 78%);
`;

function FondoAlquimico() {
  return (
    <Ambiente aria-hidden="true">
      <Trama />
    </Ambiente>
  );
}

export default FondoAlquimico;
