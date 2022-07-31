import React from 'react'
import MenuItem from './MenuItem'
import MenuTree from './MenuTree'

export default props => (
        <nav className="mt-2">
        <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
            <MenuItem path='#/app' label='Home' icon='house-user' />
            <MenuTree label='Condomínios' icon='building' permission={['Administrador']}>
                <MenuItem path='#app/vistorias' label='Consultar Condomínio' icon='bars' permission={['Administrador']}/>
                <MenuItem path='#app/vistorias/add' label='Adicionar Condomínio' icon='plus' permission={['Administrador']}/>
            </MenuTree>
            <MenuTree label='Contas' icon='clipboard-list' permission={['Administrador']}>
                <MenuItem path='#app/normas' label='Consultar Contas' icon='bars' permission={['Administrador']}/>
                <MenuItem path='#app/normas/add' label='Adicionar Conta' icon='plus' permission={['Administrador']}/>
            </MenuTree>
            <MenuTree label='Notificações' icon='bell' permission={['Administrador']}>
                <MenuItem path='#app/empresas' label='Consultar Notificações' icon='bars' permission={['Administrador']}/>
                <MenuItem path='#app/empresas/add' label='Adicionar Notificação' icon='plus' permission={['Administrador']}/>
            </MenuTree>
            <MenuTree label='Reclamações' icon='bullhorn' permission={['Administrador']}>
                <MenuItem path='#app/empresas' label='Consultar Reclamações' icon='bars' permission={['Administrador']}/>
                <MenuItem path='#app/empresas/add' label='Adicionar Reclamação' icon='plus' permission={['Administrador']}/>
            </MenuTree>
            <MenuTree label='Usuários' icon='users' permission={['Administrador']}>
                <MenuItem path='#app/usuarios' label='Consultar Usuários' icon='bars' permission={['Administrador']}/>
                <MenuItem path='#app/usuarios/add' label='Adicionar Usuário' icon='user-plus' permission={['Administrador']} />
            </MenuTree>
        </ul>
        </nav>
)