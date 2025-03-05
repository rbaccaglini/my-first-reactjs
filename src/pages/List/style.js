import styled from 'styled-components'

export const TopHeader = styled.div`
	max-height: 100px;
	gap: 30px;
	padding-left: 10px;
	margin: 5px;
	height: fit-content;
	display: flex;
	justify-content: space-between;
`

export const Container = styled.div`
	display: flex;
	fex-direction: row;
	align-items: center;
	padding: 0;
	flex-wrap: wrap;
`

export const Left = styled.div`
	width: 25%;
	vertical-align: top;
	height: 90vh;

	@media (max-width: 500px) {
		width: 100%;
	}
`

export const Right = styled.div`
	width: 75%;
	vertical-align: top;
	height: 90vh;
	flex-direction: row;

	@media (max-width: 500px) {
		width: 100%;
	}
`

export const TopContainer = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: left;
	align-items: center;
	width: 100%;
	height: 100%;
	padding: 0 10px 0;

	& input {
		width: 300px;
		height: 25px;
		margin: 10px 10px 10px 10px;
		outline: none;
		border: 2px solid rgba(255, 255, 255, 0.2);
		border-radius: 10px;
		font-size: 14px;
		padding: 20px 20px 20px 20px;
		background: transparent;
	}

	& input::placeholder {
		color: #999;
	}

	& button {
		background-color: #fff;
		border: none;
		cursor: pointer;
		border-radius: 20px;
		height: 40px;
		width: 40px;
	}
`
export const Image = styled.img`
	width: 20px;
	height: 20px;
	cursor: pointer;
	transform: translateY(10%);
`
