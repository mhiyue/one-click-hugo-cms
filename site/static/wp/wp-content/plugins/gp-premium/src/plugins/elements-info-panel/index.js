import './editor.scss';

import {
	__,
} from '@wordpress/i18n';

import {
	registerPlugin,
} from '@wordpress/plugins';

import {
	PluginDocumentSettingPanel,
} from '@wordpress/edit-post';

import {
	Component,
	Fragment,
} from '@wordpress/element';

import {
	decodeEntities,
} from '@wordpress/html-entities';

class ElementsInfoPanel extends Component {
	render() {
		const activeElements = gpPremiumEditor.activeElements;

		if ( ! activeElements || activeElements.length < 1 ) {
			return null;
		}

		if ( gpPremiumEditor.isBlockElement ) {
			return null;
		}

		return (
			<PluginDocumentSettingPanel
				name="generatepress-elements-info"
				title={ __( 'Active Elements', 'gp-premium' ) }
				className="gpp-element-info-panel gpp-element-panel-label"
			>
				<Fragment>
					<ul className="gpp-active-elements">
						{
							Object.keys( activeElements ).map( ( element, index ) => {
								return (
									<li key={ `gpp-active-block-element-${ index }` }>
										<a
											href={ activeElements[ element ].url + '&action=edit' }
										>
											{ decodeEntities( activeElements[ element ].name ) }
										</a> <span className="gpp-active-element-type">- { activeElements[ element ].type }</span>
									</li>
								);
							} )
						}
					</ul>

					<a
						href={ gpPremiumEditor.elementsUrl }
						className="components-button is-secondary"
					>
						{ __( 'All Elements', 'gp-premium' ) }
					</a>
				</Fragment>
			</PluginDocumentSettingPanel>
		);
	}
}

registerPlugin( 'generatepress-elements-info-panel', {
	icon: null,
	render: ElementsInfoPanel,
} );
