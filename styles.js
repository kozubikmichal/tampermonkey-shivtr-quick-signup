(function ($) {
	'use strict';

	GM_addStyle(`
		/* Dropdown Button */
		.dropbtn {
			background-color: #4CAF50;
			min-width: 80px;
		}

		.dropdown-icon:before {
			content: "\\25BC";
		}

		/* The container <div> - needed to position the dropdown content */
		.dropdown {
			position: relative;
			display: inline-block;
			margin-right: 3px;
		}

		/* Dropdown Content (Hidden by Default) */
		.dropdown-content {
			display: none;
			width: 100%;
			position: absolute;
			min-width: 30px;
			right: 0
			box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
			z-index: 1;
		}

		/* Links inside the dropdown */
		.dropdown-content a {
			text-decoration: none;
			text-align: left;
			display: block;
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
		}

		/* Show the dropdown menu on hover */
		.dropdown:hover .dropdown-content {
			display: block;
		}

		.quickSignUp {
			display: inline;
		}

		.quickSignUp-refresh {
			margin-right: 3px
		}

		.quickSignUp-icon-refresh:before {
			font-size: large;
			content: "\\21BB";
		}
	`);

})(jQuery);