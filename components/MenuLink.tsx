import Link from "next/link";
import { useRouter } from "next/router";
import { FC } from "react";
import { IconType } from "react-icons";
import styled from "styled-components";
import Label from "./Label";

const MenuItem = styled.div<{ withLeftMargin?: boolean; isSelected?: boolean }>`
  display: flex;
  align-items: center;
  cursor: pointer;
  margin-left: ${(props) => (props.withLeftMargin ? "1.5rem" : "0")};
  color: ${(props) =>
    props.isSelected ? "var(--color-black)" : "var(--color-gray)"};
  transition: var(--transition-off) color ease;

  :hover,
  :focus {
    color: var(--color-black);
    transition: var(--transition-om) color ease;
  }

  svg {
    font-size: 1.6rem;
    margin-right: 0.5rem;
  }
`;

interface Props {
  label: string;
  href: string;
  Icon: IconType;
  withLeftMargin?: boolean;
}

const MenuLink: FC<Props> = ({ label, href, Icon, withLeftMargin }) => {
  const router = useRouter();

  return (
    <Link href={href}>
      <MenuItem
        withLeftMargin={withLeftMargin}
        isSelected={router.pathname === href}
      >
        <Icon />
        <Label>{label}</Label>
      </MenuItem>
    </Link>
  );
};

export default MenuLink;
