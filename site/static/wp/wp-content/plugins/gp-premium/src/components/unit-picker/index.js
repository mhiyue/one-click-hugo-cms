// Import CSS
import './editor.scss';

import {
	Component,
} from '@wordpress/element';

import {
	__,
	sprintf,
	_x,
} from '@wordpress/i18n';

import {
	ButtonGroup,
	Button,
	Tooltip,
} from '@wordpress/components';

export default class UnitChooser extends Component {
	render() {
		const {
			label,
			value,
			onClick,
			units,
		} = this.props;

		return (
			<div className="components-generatepress-units-control-header__units">
				<div className="components-generatepress-units-control-label__units">
					{ label }
				</div>

				<div className="components-generatepress-control__units">
					<ButtonGroup className="components-generatepress-control-buttons__units" aria-label={ __( 'Select Units', 'gp-premium' ) }>
						{ units.map( ( unit ) => {
							let unitName = unit;

							if ( 'px' === unit ) {
								unitName = _x( 'Pixel', 'A size unit for CSS markup', 'gp-premium' );
							}

							if ( 'em' === unit ) {
								unitName = _x( 'Em', 'A size unit for CSS markup', 'gp-premium' );
							}

							if ( '%' === unit ) {
								unitName = _x( 'Percentage', 'A size unit for CSS markup', 'gp-premium' );
							}

							if ( 'deg' === unit ) {
								unitName = _x( 'Degree', 'A size unit for CSS markup', 'gp-premium' );
							}

							return <Tooltip
								/* translators: Unit type (px, em, %) */
								text={ sprintf( __( '%s Units', 'gp-premium' ), unitName ) }
								key={ unit }
							>
								<Button
									key={ unit }
									className={ 'components-generatepress-control-button__units--' + unit }
									isSmall
									isPrimary={ value === unit }
									aria-pressed={ value === unit }
									/* translators: %s: values associated with CSS syntax, 'Pixel', 'Em', 'Percentage' */
									aria-label={ sprintf( __( '%s Units', 'gp-premium' ), unitName ) }
									onClick={ () => onClick( unit ) }
								>
									{ unit }
								</Button>
							</Tooltip>;
						} ) }
					</ButtonGroup>
				</div>
			</div>
		);
	}
}
