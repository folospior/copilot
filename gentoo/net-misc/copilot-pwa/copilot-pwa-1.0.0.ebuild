# Copyright 2025 Gentoo Authors
# Distributed under the terms of the GNU General Public License v2

EAPI=8

inherit desktop xdg

DESCRIPTION="GitHub Copilot desktop app for Linux"
HOMEPAGE="https://copilot.microsoft.com"
SRC_URI="https://github.com/folospior/copilot/archive/v${PV}.tar.gz -> ${P}.tar.gz"

LICENSE="MIT"
SLOT="0"
KEYWORDS="~amd64"

# The app has no production npm dependencies; only Electron is required at runtime.
RDEPEND=">=dev-util/electron-33:33"

# GitHub archive extracts as copilot-<version>, not copilot-pwa-<version>.
S="${WORKDIR}/copilot-${PV}"

src_install() {
	# Install application sources under /opt.
	insinto /opt/${PN}
	doins -r src assets package.json

	# Wrapper script that invokes the system-installed Electron binary.
	exeinto /usr/bin
	newexe - ${PN} <<-EOF
		#!/bin/sh
		exec /usr/bin/electron /opt/${PN}/src/main.js "\$@"
	EOF

	# Icon and .desktop entry.
	newicon assets/icon.png ${PN}.png
	make_desktop_entry "${PN}" "Microsoft Copilot" "${PN}" "Network;WebBrowser;"
}

pkg_postinst() {
	xdg_pkg_postinst
}
