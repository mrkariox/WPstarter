<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the
 * installation. You don't have to use the web site, you can
 * copy this file to "wp-config.php" and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * MySQL settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://codex.wordpress.org/Editing_wp-config.php
 *
 * @package WordPress
 */

// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define('DB_NAME', 'wpstarter');

/** MySQL database username */
define('DB_USER', 'root');

/** MySQL database password */
define('DB_PASSWORD', '');

/** MySQL hostname */
define('DB_HOST', 'localhost');

/** Database Charset to use in creating database tables. */
define('DB_CHARSET', 'utf8mb4');

/** The Database Collate type. Don't change this if in doubt. */
define('DB_COLLATE', '');

/**#@+
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define('AUTH_KEY',         'Nug|z|*f 7^&Fxv|Z3@t)yA](j5DJt])LO&EIRYr!w5G[~wxJ0J uV~.E#@VILIr');
define('SECURE_AUTH_KEY',  'CcYhu5j*bc,1C!J1g#WSWZv4S!I|iFHV|Wr%LH^/n}aE(yR6@EtU<%%`DF*N,njD');
define('LOGGED_IN_KEY',    'GaagX}qJh#y>LVyGFY6B2OU_?a*m`jVIh`6jna-Teg5NgZE^)63l$j&+8^i/5b$.');
define('NONCE_KEY',        'Mx+b5N6T-.ly:GG^Cixe4f:tN.)0-&gMd<cgS{%{`Y0M_6o A@.4+1}{6TGtx.}l');
define('AUTH_SALT',        'koek=Tm+; %+{C%Ubz6Xl*F[2_Q>5+9{0G~iE#4S:XO_WL4l`M^$2<[w26o|r0LV');
define('SECURE_AUTH_SALT', '$qTlj=A{mDft3+V1V@X xh`>EC6`Wn{~</;xmVe{b%zM%]%3%:7!KP(o8lXS{pi~');
define('LOGGED_IN_SALT',   '5QJ6,@5{I}r4i&LAI`2fb&W9Zm4p6mc2]LQZ|b^p g5r4[<T22mY(KUdM23!hgL%');
define('NONCE_SALT',       '3*R{E*]4,[TcH`h3~57]^pM{Y3]k0f>%*k?nA47MWMpr`1bqG {1~B/^XR,PDp5e');

/**#@-*/

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix  = 'arch_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the Codex.
 *
 * @link https://codex.wordpress.org/Debugging_in_WordPress
 */
define('WP_DEBUG', false);

/* That's all, stop editing! Happy blogging. */

/** Absolute path to the WordPress directory. */
if ( !defined('ABSPATH') )
	define('ABSPATH', dirname(__FILE__) . '/');

/** Sets up WordPress vars and included files. */
require_once(ABSPATH . 'wp-settings.php');
