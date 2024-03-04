import React, { useEffect, useMemo, useState } from "react";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Button, NavbarMenu, NavbarMenuToggle, NavbarMenuItem, Divider, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, } from "@nextui-org/react";
import MoonIcon from "../Icons/MoonIcon";
import SunIcon from "../Icons/SunIcon";
import detectTheme from "../modules/DetectSystemTheme";
import Brush from "../Icons/Brush";
import { Link as RouterLink, useLocation } from "react-router-dom";

const getTheme = () => {
  const theme = localStorage.getItem('theme');
  if (theme) {
    if ((theme === 'light') || (theme === 'dark') || (theme === 'system')) {
      return theme

    } else {
      return "system"
    }
  } else {
    return "system"
  }
}
export default function Nav() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const Links = useMemo(function () {
    return {
      forDesktop: [
        {
          "name": "home",
          "href": "/"
        },
        {
          "name": "Resources",
          "href": "/resources"
        },

        {
          "name": "Contact",
          "href": "/contact"
        }
      ],
      forMobile: [
        {
          "name": "home",
          "href": "/"
        },
        {
          "name": "Resources",
          "href": "/resources"
        },

        {
          "name": "Contact",
          "href": "/contact"
        }, {
          "name": "Blogs",
          "href": "/resources/blogs"
        }, {
          "name": "Account",
          "href": "/resources/account/login"
        },
      ]
    };
  }, [])
  const location = useLocation()
  const [selectedTheme, setSelectedTheme] = useState<"light" | "dark" | "system">(getTheme())





  useEffect(() => {
    const applyTheme = (themeName: "light" | "dark") => {
      if ((!document.body.classList.contains('dark')) && (!document.body.classList.contains('light'))) {
        document.body.classList.add(themeName)
      } else {
        if (themeName === "dark") {
          document.body.classList.replace('light', 'dark')
        } else if (themeName === "light") {
          document.body.classList.replace('dark', 'light')
        }
      }
    }
    if (selectedTheme === "system") {
      detectTheme()
        .then(themeName => {
          return applyTheme(themeName)
        })
        .catch(err => {
          throw new Error("You are running custom theme or We have internal problem: " + err)
        })
    }
    else if ((selectedTheme === "light") || (selectedTheme === "dark")) {
      applyTheme(selectedTheme)
    } else {
      throw new Error('Problems In Theme Detection. Light Theme Enabled')
    }

    localStorage.setItem('theme', selectedTheme)
  }, [selectedTheme])

  return (
    <>
      <Navbar shouldHideOnScroll isMenuOpen={isMenuOpen} onMenuOpenChange={setIsMenuOpen}
        classNames={{

          wrapper: [
            "max-w-[1440px]"
          ],

        }} >

        <NavbarBrand className="select-none">
          <p className="text-2xl max-sm:text-medium font-bold text-danger" >
            IdleCoders
          </p>
        </NavbarBrand>

        <NavbarContent className="hidden lg:flex gap-4" justify="center">

          {Links.forDesktop.map((item, index) => (
            <NavbarItem
              isActive={location.pathname === item.href}
              key={`${item}-${index} ${item}desk`}
            >
              <Button
                variant="light"
                radius="full"
                disableRipple
                as={RouterLink}
                color={
                  (location.pathname === item.href) || (location.pathname.includes(`${item.href}/`)) ? "danger" : "default"
                }
                to={item.href}

                className="capitalize hover:bg-none">
                {item.name}
              </Button>

            </NavbarItem>
          ))}



        </NavbarContent>
        <NavbarContent justify="end">
          <NavbarItem >
            <Dropdown>
              <DropdownTrigger>

                <Button isIconOnly size="md" variant="light" radius="full" title="Change Theme">
                  {
                    selectedTheme === "system" ? <Brush /> :
                      (selectedTheme === 'dark' ? <MoonIcon /> :
                        <SunIcon />
                      )
                  }

                </Button>
              </DropdownTrigger>

              <DropdownMenu aria-label="static-theme-menu" >

                <DropdownItem key={'light'} onClick={() => { setSelectedTheme("light") }}
                  endContent={
                    <SunIcon />
                  }>
                  Light Mode

                </DropdownItem>
                <DropdownItem key={'dark'} onClick={() => { setSelectedTheme("dark") }}
                  endContent={
                    <MoonIcon />
                  }>
                  Dark Mode

                </DropdownItem>
                <DropdownItem key={'system'} color="primary" onClick={() => { setSelectedTheme("system") }}
                  endContent={
                    <Brush />
                  } >
                  System Theme
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>

          </NavbarItem>

          <NavbarMenuToggle
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            className="lg:hidden"
          />
        </NavbarContent>
        <NavbarMenu>
          {Links.forMobile.map((item, index) => (
            <NavbarMenuItem
              key={`${item}-${index}`}
              isActive={location.pathname === item.href}
            >

              <Button
                variant="light"
                as={RouterLink}
                to={item.href}
                color={
                  location.pathname === item.href ? "danger" : item.name.toLowerCase() === "sign up" ? "danger" : "default"
                }
                className="w-full capitalize"
                size="sm"
                radius="none"

              >
                {item.name}
              </Button>
            </NavbarMenuItem>
          ))}
        </NavbarMenu>
      </Navbar >
      <Divider />
    </>
  );
}
