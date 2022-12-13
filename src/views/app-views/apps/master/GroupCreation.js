import React, { useState, useRef, useContext } from 'react'
import { AppContext } from 'components/ContextApi';
import { Card, Table, Select, Input, Button, Badge, Menu, Modal, Form, message } from 'antd';
import { Option } from 'antd/lib/mentions';
import ProductListData from "assets/data/product-list.data.json"
import { EditOutlined, DeleteOutlined, SearchOutlined, PlusCircleOutlined } from '@ant-design/icons';
import EllipsisDropdown from 'components/shared-components/EllipsisDropdown';
import Flex from 'components/shared-components/Flex'
import utils from 'utils'
import { useEffect } from 'react';
import { getAccountUnderGroup } from 'utils/api/accountUnderGroup';
import { getGroupCreation, updateGroupCreation, createGroupCreation, deleteGroupCreation, getMethodAllocate } from 'utils/api/groupCreation';


const layout = {
	labelCol: { span: 8 },
	wrapperCol: { span: 16 },
};
const tailLayout = {
	wrapperCol: { offset: 8, span: 16 },
};


const GroupCreation = () => {
	const {showTitle}=useContext(AppContext)
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [submitLoading, setSubmitLoading] = useState(false)
	const [isEdit, setIsEdit] = useState(false)
	const [selectedId, setSelectedId] = useState("")
	const [list, setList] = useState(ProductListData)
	const [selectedRows, setSelectedRows] = useState([])
	const [selectedRowKeys, setSelectedRowKeys] = useState([])
	const [accountUnderGroupList, setAccountUnderGroupList] = useState([])
	const [methodAlocateList, setMethodAlocateList] = useState([]);
	const [groupcreationList, setGroupCreationList] = useState([]);
	const [initialLoading, setInitialLoading] = useState(false)
	const [openDeleteModal, setOpenDeleteModal] = useState({
		open: false,
		id: '',
		name: ''
	})
	const addButtonRef = useRef(null)
const formInputRef = useRef(null)

	const showModal = () => {
		setIsModalOpen(true);
	};
	const showEditModal = (row) => {
		setIsModalOpen(true);
		setIsEdit(true);
		setSelectedId(row.id)
		form.setFieldsValue({
			name:row.name,
			account_under_group_id:row.account_under_group_id,
			group_behaves:row.group_behaves,
			net_cr_cr:row.net_cr_cr,
			used_for_calculation:row.used_for_calculation,
			method_allocate_id:row.method_allocate_id
		})
	};
	const handleOk = () => {
		setIsModalOpen(false);
	};
	const handleCancel = () => {
		setIsModalOpen(false);
		setIsEdit(false);
		setSelectedId("")
		form.resetFields();
	};

	function handleEnter(event) {
		const form = event?.target?.form;
		console.log(event?.key, 'key===')
		const index = Array.prototype.indexOf.call(form, event.target);
		if (event.keyCode === 13) {
			if ((index + 1) < form.elements.length) {
				form.elements[index + 1]?.focus();
				event.preventDefault();
			}
		} else if (event.keyCode === 27) {
			if ((index - 1) > 0) {
				form.elements[index - 1]?.focus();
			}
			event.preventDefault();
		}
	}
	const [form] = Form.useForm()
	const onFinish = async (values) => {
		try {
			const { name, account_under_group_id, group_behaves, net_cr_cr, used_for_calculation, method_allocate_id } = values;
			setSubmitLoading(true)
			if (isEdit && selectedId) {
				const response = await updateGroupCreation(selectedId, name, account_under_group_id, group_behaves, net_cr_cr, used_for_calculation, method_allocate_id);
				if (response.success === true) {
					message.success(response.message)
				}
			} else {
				const response = await createGroupCreation(name, account_under_group_id, group_behaves, net_cr_cr, used_for_calculation, method_allocate_id);
				if (response.success === true) {
					message.success(response.message)
				}
			}
			setSubmitLoading(false)
			init()
			setIsModalOpen(false);
			setIsEdit(false);
			setSelectedId("")
			form.resetFields();
		} catch (error) {
			message.error(message)
			submitLoading(false)
			return
		}
	};

	const onFinishFailed = errorInfo => {
		// console.log('Failed:', errorInfo);
	};

	async function init() {
		try {
			setInitialLoading(true)
			const response = await getGroupCreation();
			if (response.data?.length) {
				setGroupCreationList(response.data)
				setIsModalOpen(false);
				// message.success(response.message)
			} else {
				setGroupCreationList([])
			}
			setInitialLoading(false)
		} catch (error) {
			message.error(message)
			setInitialLoading(false)
		}
	}
const getAccountUnderGroupData=async()=>{
    const response = await getAccountUnderGroup();
        if (response.data?.length) {
            setAccountUnderGroupList(response.data)
            setIsModalOpen(false);
        } else {
            setAccountUnderGroupList([])
        }
}
const getMethodAllcateData=async()=>{
    const response = await getMethodAllocate();
        if (response.data?.length) {
            setMethodAlocateList(response.data)
            setIsModalOpen(false);
        } else {
            setMethodAlocateList([])
        }
}

useEffect(() => {
	if(!isModalOpen) {
		addButtonRef?.current?.focus()
	} else {
		formInputRef?.current?.focus()
	}
},[isModalOpen])
	useEffect(() => {
		init()
		getAccountUnderGroupData()
		getMethodAllcateData()
	}, [])

	const dropdownMenu = row => (

		<Menu>
			<Menu.Item onClick={() => showEditModal(row)}>
				<Flex alignItems="center">
					<EditOutlined />
					<span className="ml-2">Edit</span>
				</Flex>
			</Menu.Item>
			<Menu.Item onClick={() => setOpenDeleteModal({ open: true, id: row.id, name: row.name })}>
				<Flex alignItems="center">
					<DeleteOutlined />
					<span className="ml-2">{selectedRows.length > 0 ? `Delete (${selectedRows.length})` : 'Delete'}</span>
				</Flex>
			</Menu.Item>
		</Menu>
	);

	const deleteRow = async (id) => {
		if (!id) return;
		setSubmitLoading(true)
		const response = await deleteGroupCreation(id)
		setSubmitLoading(false)
		init()
		if (response?.success === true) {
			message.success(response.message)
			init()
		}
		setOpenDeleteModal({
			open: false,
			id: '',
			name: ''
		})
	}

	const tableColumns = [
		{
			title: 'ID',
			dataIndex: 'id'
		},
		{
			title: 'Group Name',
			dataIndex: 'name',
			render: (_, record) => (
				<div className="d-flex">
					{/* <AvatarStatus size={60} type="square" src={record.image} name={record.name}  /> */}
					{/* <AvatarStatus size={60} type="square"name={record.name}  /> */}
					{record.name}
				</div>
			),
			sorter: (a, b) => utils.antdTableSorter(a, b, 'name')
		},
		{
			title: 'A/c Under group',
			dataIndex: 'aug',
			render: (_, record) => (
				<div className="d-flex">
					{/* <AvatarStatus size={60} type="square" src={record.image} name={record.name}  /> */}
					{/* <AvatarStatus size={60} type="square"name={record.name}  /> */}
					{record.account_under_group }
				</div>
			),
			sorter: (a, b) => utils.antdTableSorter(a, b, 'name')
		},
		{
			title: 'Group behaves',
			dataIndex: 'gb',
			render: (_, record) => (
				<div className="d-flex">
					{/* <AvatarStatus size={60} type="square" src={record.image} name={record.name}  /> */}
					{/* <AvatarStatus size={60} type="square"name={record.name}  /> */}
					{record.group_behaves }
				</div>
			),
			sorter: (a, b) => utils.antdTableSorter(a, b, 'name')
		},
		{
			title: 'Net Credit/Debit',
			dataIndex: 'ncd',
			render: (_, record) => (
				<div className="d-flex">
					{/* <AvatarStatus size={60} type="square" src={record.image} name={record.name}  /> */}
					{/* <AvatarStatus size={60} type="square"name={record.name}  /> */}
					{record.net_cr_cr  }
				</div>
			),
			sorter: (a, b) => utils.antdTableSorter(a, b, 'name')
		},
		{
			title: 'Use for Calulation',
			dataIndex: 'ufc',
			render: (_, record) => (
				<div className="d-flex">
					{/* <AvatarStatus size={60} type="square" src={record.image} name={record.name}  /> */}
					{/* <AvatarStatus size={60} type="square"name={record.name}  /> */}
					{record.used_for_calculation}
				</div>
			),
			sorter: (a, b) => utils.antdTableSorter(a, b, 'name')
		},
		
		{
			title: 'Method allocate',
			dataIndex: 'ma',	
			render: (_, record) => (
				<div className="d-flex">
					{/* <AvatarStatus size={60} type="square" src={record.image} name={record.name}  /> */}
					{/* <AvatarStatus size={60} type="square"name={record.name}  /> */}
					{record.method_allocate_name}
				</div>
			),
			sorter: (a, b) => utils.antdTableSorter(a, b, 'name')
		},
		

		{
			title: 'Created Date',
			dataIndex: 'name',
			render: (_, record) => (
				<div className="d-flex">
					{/* <AvatarStatus size={60} type="square" src={record.image} name={record.name}  /> */}
					{/* <AvatarStatus size={60} type="square"name={record.name}  /> */}
					{record.created_at}
				</div>
			),
			sorter: (a, b) => utils.antdTableSorter(a, b, 'name')
		},
		{
			title: 'Updated Date',
			dataIndex: 'name',
			render: (_, record) => (
				<div className="d-flex">
					{/* <AvatarStatus size={60} type="square" src={record.image} name={record.name}  /> */}
					{/* <AvatarStatus size={60} type="square"name={record.name}  /> */}
					{record.updated_at}
				</div>
			),
			sorter: (a, b) => utils.antdTableSorter(a, b, 'name')
		},

		{
			title: 'Action',
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
						{/* <div className="mb-3">
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
						</div> */}
					</Flex>
					<div>
						<Button onClick={showModal} type="primary" ref={addButtonRef} autoFocus icon={<PlusCircleOutlined />} block>Group create</Button>
					</div>
				</Flex>
				<div className="table-responsive">
					<Table
						columns={tableColumns}
						dataSource={groupcreationList}
						rowKey='id'
						rowSelection={{
							selectedRowKeys: selectedRowKeys,
							type: 'checkbox',
							preserveSelectedRowKeys: false,
							...rowSelection,

						}}
						loading={initialLoading}
					/>
				</div>
			</Card>

			<Modal
			className={`${showTitle ?  'VoucherType' : 'addGroupCreation'}`}  
				title={isEdit ? "Edit Group create" : "Group create"}
				open={isModalOpen}
				onCancel={handleCancel}
				footer={[]}
			>
				<Form
					form={form}
					// style={{ width: '100%' }}
					style={{ width: showTitle ? '85%' : '100%' }}
					// style={{boxShadow: '2px 5px 15px -10px rgb(0,0,0,0.5)',  padding:'10px', width:'50%'}}
					{...layout}
					name="basic"
					initialValues={{ remember: true }}
					onFinish={onFinish}
					onFinishFailed={onFinishFailed}
				>

					<Form.Item
						// style={{width:"35%"}}
						className={`${showTitle ? '' : 'hide-label'}`}
						label="Group Name"
						name="name"
						rules={[{ required: true, message: ' Group create is required!' }]}
						onKeyDown={handleEnter}
					>
						<Input placeholder="Group Name" autoFocus ref={formInputRef} />
					</Form.Item>

					<Form.Item
					className={`${showTitle ? '' : 'hide-label'}`}
						label="Groups behaves like a sub-ledger:"
						name="group_behaves"
						onKeyDown={handleEnter}
						rules={[{ required: true, message: 'Groups behaves like a sub-ledger is required' }]}
					>
						<Input placeholder="Groups behaves like a sub-ledger" />
					</Form.Item>
					<Form.Item
						className={`${showTitle ? '' : 'hide-label'}`}
						label="Net Debit/Credit blances for reporting:"
						name="net_cr_cr"
						onKeyDown={handleEnter}
						rules={[{ required: true, message: 'Net Debit/Credit blances for reporting is required' }]}
					>
						<Input placeholder="Net Debit/Credit blances for reporting" />
					</Form.Item>
					<Form.Item
						className={`${showTitle ? '' : 'hide-label'}`}
						label="Used for calculation(for exm: taxes,discount):"
						name="used_for_calculation"
						onKeyDown={handleEnter}
						rules={[{ required: true, message: 'Used for calculation(for exm: taxes,discount is required' }]}
					>
						<Input placeholder="Used for calculation(for exm: taxes,discount" />
					</Form.Item>


					<Form.Item 
					className={`${showTitle ? '' : 'hide-label'}`}
					onKeyDown={handleEnter} 
					name="account_under_group_id" 
					label="Select Account under group:" 
					rules={[{ required: true, message: 'Account under group  select is required' }]}
					 >
						<Select className="w-100" placeholder="Select Account under group ">
							{
								accountUnderGroupList.length > 0 ?
									accountUnderGroupList.map((elm) => {
										return <Option key={elm.id} value={elm.id}>{elm.name}</Option>
									})
									:
									"No Data"
							}
						</Select>
					</Form.Item>
					<Form.Item 
					className={`${showTitle ? '' : 'hide-label'}`}
					onKeyDown={handleEnter} 
					name="method_allocate_id"
					 label="Method Allocate when used in purchase:" 
					 rules={[{ required: true, message: ' Method Allocate when used in purchase select is required' }]}
					  >
						<Select className="w-100" placeholder="Select Method Allocate when used in purchase invoice">
							{
								methodAlocateList.length > 0 ?
									methodAlocateList.map((elm) => {
										return <Option key={elm.id} value={elm.id}>{elm.name}</Option>
									})
									:
									"No Data"
							}
						</Select>
					</Form.Item>

					<Form.Item
						{...tailLayout}
					>
						<div
							 style={{
								width: 'fit-content',
								display: "flex",
								justifyContent: "center"
							   }}
						>
							<Button type="primary" htmlType="submit" loading={submitLoading}>
								{isEdit ? "Save" : "Submit"}
							</Button>
							<Button type="primary" onClick={handleCancel} style={{ marginLeft: '20px' }}	>
								Cancel
							</Button>
						</div>
					</Form.Item>

				</Form>
			</Modal>
			{/* Delete confirmation popup */}
			<Modal
				title={"Delete Group create"}
				open={openDeleteModal.open}
				onCancel={() => setOpenDeleteModal({
					open: false,
					id: '',
					name: ''
				})}
				footer={[
					<Button
						type="primary"
						loading={submitLoading}
						htmlType="submit"
						onClick={() => deleteRow(openDeleteModal.id)}
					>
						Delete
					</Button>,
					<Button type="primary" onClick={() => setOpenDeleteModal({
						open: false,
						id: '',
						name: ''
					})}
					>
						Cancel
					</Button>
				]}
			>
				<div>
					<h2>{`Are you sure you want to delete ${openDeleteModal.name} Group create?`}</h2>
				</div>
			</Modal>
		</>
	)
}

export default GroupCreation
