(function ($) {
	'use strict';

	const ROLES = [{
		id: "tank",
		name: "Tank",
		icon: "icon-shield"
	}, {
		id: "",
		name: "DPS",
		icon: "icon-sword",
	}, {
		id: "support",
		name: "Support",
		icon: "icon-add"
	}];

	const originalAjax = $.ajax;

	const instanceId = document.getElementById("commentable_id").value;

	const signUpUrl = `/events/instances/${instanceId}/participants`;

	let storedCharacters;

	const parseCharactersPage = function (pageHtml) {
		const parser = new DOMParser();
		const pageDocument = parser.parseFromString(pageHtml, "text/html");

		return Array.from(
			pageDocument.querySelectorAll(".characters .member_link")
		).map((character) => {
			return {
				id: character.href.substr(character.href.lastIndexOf("/") + 1),
				name: character.textContent
			};
		});
	};

	const loadCharacters = function () {
		if (storedCharacters) {
			return Promise.resolve(storedCharacters);
		}

		const memberLink = document.querySelector(".dropdown-menu a");

		if (!memberLink) {
			return Promise.resolve([]);
		}

		return $.get(memberLink.href + "/characters").then((charactersHtml) => {
			storedCharacters = parseCharactersPage(charactersHtml);
			return storedCharacters;
		});
	};

	const createQuickSignUps = function (characters) {
		const controlsRow = $("#signup_info");
		const controlsIndex = controlsRow.children().first().hasClass("pull-right") ? 1 : 0;
		const controls = controlsRow.children().eq(controlsIndex);
		const container = $(`<div class="quickSignUp"></div>`);
		const refreshButton = $(`<button class="btn-primary btn-small quickSignUp-refresh"><span class="quickSignUp-icon-refresh"></span></button>`);

		// container.append(refreshButton);

		characters.forEach((character) => {
			const element = $(`
				<div class="dropdown">
					<button class="dropbtn btn-primary btn-small">${character.name} <span class="dropdown-icon"></span></button>
					<div class="dropdown-content">
					</div>
				</div>
			`);
			const dropdown = element.find(".dropdown-content");

			ROLES.forEach((role) => {
				const link = $(`<a class="btn-primary btn-small" href="#" title="${role.name}"><span class="${role.icon}"></span> ${role.name}</a>`);
				link.click((event) => onPressCharacterRole(event, character.id, role.id));

				dropdown.append(link);
			});

			container.append(element);
		});

		refreshButton.click(() => onPressRefresh());

		controls.prepend(container);
	};

	const onPressRefresh = function () {
		$(".quickSignUp").remove();
		run();
	};

	const onPressCharacterRole = function (event, character, role) {
		event.preventDefault();

		const data = `utf8=✓&for_block=&view=&event_participant[attending]=1.yes&event_participant[character_id]=${character}&event_participant[role]=${role}&commit=Signup`;

		$.post(signUpUrl, data).always(() => {
			window.location.reload();
		});
	};

	// Inject Ajax requests, to keep button visible during switching tabs.
	$.ajax = (options) => originalAjax(options).always(() => {
		if (
			options.type === "GET" &&
			options.url.match(/\/events\/\d+\?event_instance_id=\d+(&view=(classes|status|groups))?$/)
		) {
			run();
		}
	});

	const run = function () {
		loadCharacters().then((characters) => {
			return createQuickSignUps(characters);
		});
	};

	// On page load
	run();
})(jQuery);