import React, { useState } from 'react'
import { Card, Table, Select, Input, Button, Badge, Menu, Modal, Form } from 'antd';
import ProductListData from "assets/data/product-list.data.json"
import { EyeOutlined, DeleteOutlined, SearchOutlined, PlusCircleOutlined } from '@ant-design/icons';
import AvatarStatus from 'components/shared-components/AvatarStatus';
import EllipsisDropdown from 'components/shared-components/EllipsisDropdown';
import Flex from 'components/shared-components/Flex'
import NumberFormat from 'react-number-format';
import { useNavigate } from "react-router-dom";
import utils from 'utils'

// import { Form, Input, Checkbox } from 'antd';
import { useEffect } from 'react';
import { createGST, getGST } from 'utils/api/gst';

const layout = {
	labelCol: { span: 8 },
	wrapperCol: { span: 16 },
};
const tailLayout = {
	wrapperCol: { offset: 8, span: 16 },
};


const { Option } = Select

const getStockStatus = stockCount => {
	if (stockCount >= 10) {
		return <><Badge status="success" /><span>In Stock</span></>
	}
	if (stockCount < 10 && stockCount > 0) {
		return <><Badge status="warning" /><span>Limited Stock</span></>
	}
	if (stockCount === 0) {
		return <><Badge status="error" /><span>Out of Stock</span></>
	}
	return null
}

const categories = ['Cloths', 'Bags', 'Shoes', 'Watches', 'Devices']

const Country = () => {

	const [isModalOpen, setIsModalOpen] = useState(false);
	const showModal = () => {
		setIsModalOpen(true);
	};
	const handleOk = () => {
		setIsModalOpen(false);
	};
	const handleCancel = () => {
		setIsModalOpen(false);
	};
	const navigate = useNavigate();
	const [list, setList] = useState(ProductListData)
	const [selectedRows, setSelectedRows] = useState([])
	const [selectedRowKeys, setSelectedRowKeys] = useState([])
	const [gstList, setGstList] = useState([])
	

	const onFinish = async (values) => {

		const { name, percent } = values
		const res = await createGST(name, percent);

		setIsModalOpen(false);

	};

	const onFinishFailed = errorInfo => {
		console.log('Failed:', errorInfo);
	};

	useEffect(() => {
		async function init() {
			const data = await getGST();
			console.log(data)
			if (data?.length) {
				setGstList(data)
				setIsModalOpen(false);
			} else {
				setGstList([])
			}

		}
		init()
	}, [])

	const dropdownMenu = row => (
		<Menu>
			<Menu.Item onClick={() => viewDetails(row)}>
				<Flex alignItems="center">
					<EyeOutlined />
					<span className="ml-2">Edit</span>
				</Flex>
			</Menu.Item>
			<Menu.Item onClick={() => deleteRow(row)}>
				<Flex alignItems="center">
					<DeleteOutlined />
					<span className="ml-2">{selectedRows.length > 0 ? `Delete (${selectedRows.length})` : 'Delete'}</span>
				</Flex>
			</Menu.Item>
		</Menu>
	);

	const addProduct = () => {
		navigate(`/app/apps/ecommerce/add-product`)
	}

	const viewDetails = row => {
		navigate(`/app/apps/ecommerce/edit-product/${row.id}`)
	}

	const deleteRow = row => {
		const objKey = 'id'
		let data = list
		if (selectedRows.length > 1) {
			selectedRows.forEach(elm => {
				data = utils.deleteArrayRow(data, objKey, elm.id)
				setList(data)
				setSelectedRows([])
			})
		} else {
			data = utils.deleteArrayRow(data, objKey, row.id)
			setList(data)
		}
	}

	const tableColumns = [
		{
			title: 'ID',
			dataIndex: 'id'
		},
		{
			title: 'Product',
			dataIndex: 'name',
			render: (_, record) => (
				<div className="d-flex">
					<AvatarStatus size={60} type="square" src={record.image} name={record.name} />
				</div>
			),
			sorter: (a, b) => utils.antdTableSorter(a, b, 'name')
		},
		{
			title: 'Category',
			dataIndex: 'category',
			sorter: (a, b) => utils.antdTableSorter(a, b, 'category')
		},
		{
			title: 'Price',
			dataIndex: 'price',
			render: price => (
				<div>
					<NumberFormat
						displayType={'text'}
						value={(Math.round(price * 100) / 100).toFixed(2)}
						prefix={'$'}
						thousandSeparator={true}
					/>
				</div>
			),
			sorter: (a, b) => utils.antdTableSorter(a, b, 'price')
		},
		{
			title: 'Stock',
			dataIndex: 'stock',
			sorter: (a, b) => utils.antdTableSorter(a, b, 'stock')
		},
		{
			title: 'Status',
			dataIndex: 'stock',
			render: stock => (
				<Flex alignItems="center">{getStockStatus(stock)}</Flex>
			),
			sorter: (a, b) => utils.antdTableSorter(a, b, 'stock')
		},
		{
			title: '',
			dataIndex: 'actions',
			render: (_, elm) => (
				<div className="text-right">
					<EllipsisDropdown menu={dropdownMenu(elm)} />
				</div>
			)
		}
	];

	const rowSelection = {
		onChange: (key, rows) => {
			setSelectedRows(rows)
			setSelectedRowKeys(key)
		}
	};

	const onSearch = e => {
		const value = e.currentTarget.value
		const searchArray = e.currentTarget.value ? list : ProductListData
		const data = utils.wildCardSearch(searchArray, value)
		setList(data)
		setSelectedRowKeys([])
	}

	const handleShowCategory = value => {
		if (value !== 'All') {
			const key = 'category'
			const data = utils.filterArray(ProductListData, key, value)
			setList(data)
		} else {
			setList(ProductListData)
		}
	}

	return (
		<>
			<Card>
				<Flex alignItems="center" justifyContent="between" mobileFlex={false}>
					<Flex className="mb-1" mobileFlex={false}>
						<div className="mr-md-3 mb-3">
							<Input placeholder="Search" prefix={<SearchOutlined />} onChange={e => onSearch(e)} />
						</div>
						<div className="mb-3">
							<Select
								defaultValue="All"
								className="w-100"
								style={{ minWidth: 180 }}
								onChange={handleShowCategory}
								placeholder="Category"
							>
								<Option value="All">All</Option>
								{
									categories.map(elm => (
										<Option key={elm} value={elm}>{elm}</Option>
									))
								}
							</Select>
						</div>
					</Flex>
					<div>
						<Button onClick={showModal} type="primary" icon={<PlusCircleOutlined />} block>Add GST</Button>
					</div>
				</Flex>
				<div className="table-responsive">
					<Table
						columns={tableColumns}
						dataSource={list}
						rowKey='id'
						rowSelection={{
							selectedRowKeys: selectedRowKeys,
							type: 'checkbox',
							preserveSelectedRowKeys: false,
							...rowSelection,
						}}
					/>
				</div>
			</Card>

			{/* add gst************************************************************************ */}

			<Modal title="Add GST" open={isModalOpen} onCancel={handleCancel} footer={[
				// <Button type="primary" htmlType="submit"  onClick={onFinish}>
				// 	Submit
				// </Button>,
				// <Button type="primary" onClick={handleCancel}	>
				// 			Cancel
				// 		</Button>
			]}>
				<Form
					// style={{boxShadow: '2px 5px 15px -10px rgb(0,0,0,0.5)',  padding:'10px', width:'50%'}}
					{...layout}
					name="basic"
					initialValues={{ remember: true }}
					onFinish={onFinish}
					onFinishFailed={onFinishFailed}
				>

					<Form.Item
						// style={{width:"35%"}}
						label="Gst"
						name="name"
						rules={[{ required: true, message: ' Gst is required!' }]}
					>
						<Input />
					</Form.Item>

					<Form.Item
						// style={{width:"35%"}}
						placeholder="Enter Gst"
						label="Percent"
						name="percent"
						rules={[{ required: true, message: 'Percent is required' }]}
					>
						<Input />
					</Form.Item>



					<Form.Item {...tailLayout}  >

						<div style={{
							width: '90%',
							marginLeft: "80px"}}>
						<Button type="primary" htmlType="submit" >
							Submit
						</Button>
						<Button type="primary" onClick={handleCancel} style={{ marginLeft: '30px' }}	>
							Cancel
						</Button>
					</div>

				</Form.Item>

			</Form>
		</Modal>
		</>
	)




}

export default Country
